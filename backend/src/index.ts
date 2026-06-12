import "dotenv/config";
import { createServer } from "node:http";
import { createApp } from "./server.js";

const port = Number(process.env.API_PORT ?? 4000);
const app = createApp();
const server = createServer(app);

server.listen(port, () => {
  console.log(`qanbie API listening on http://localhost:${port}`);
});
