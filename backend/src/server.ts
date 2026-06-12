import cors from "cors";
import express, { type NextFunction, type Request, type Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { z } from "zod";
import {
  registerAuthRoutes,
  registerContentRoutes,
  registerDuelRoutes,
  registerWorldDropRoutes,
  registerMotionMatchRoutes,
  registerChatRoutes,
  registerStoreRoutes,
  registerPaymentRoutes,
  registerAdminRoutes,
} from "./routes/index.js";

export function createApp() {
  const app = express();
  app.use(helmet());
  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json({ limit: "10mb" }));
  app.use(morgan("tiny"));

  app.get("/health", (_req, res) => res.json({ ok: true, service: "qanbie-api", version: "0.1.0" }));

  registerAuthRoutes(app);
  registerContentRoutes(app);
  registerDuelRoutes(app);
  registerWorldDropRoutes(app);
  registerMotionMatchRoutes(app);
  registerChatRoutes(app);
  registerStoreRoutes(app);
  registerPaymentRoutes(app);
  registerAdminRoutes(app);

  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof z.ZodError) return res.status(400).json({ error: "VALIDATION_ERROR", issues: err.issues });
    console.error(err);
    return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
  });

  return app;
}

