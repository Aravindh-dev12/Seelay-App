import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const apps = getApps();
if (!apps.length) {
  try {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID ?? "seelay-demo",
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL ?? "demo@seelay.iam.gserviceaccount.com",
        privateKey: (process.env.FIREBASE_PRIVATE_KEY ?? "").replace(/\\n/g, "\n"),
      }),
    });
  } catch {
    // graceful fallback for local dev without Firebase credentials
  }
}

export async function verifyFirebaseToken(token: string) {
  try {
    const decoded = await getAuth().verifyIdToken(token, true);
    return { uid: decoded.uid, email: decoded.email, phone: decoded.phone_number, name: decoded.name };
  } catch {
    return null;
  }
}

export async function getOrCreateUser(firebaseUid: string, email?: string) {
  try {
    const user = await getAuth().getUser(firebaseUid);
    return { uid: user.uid, email: user.email, displayName: user.displayName, phone: user.phoneNumber };
  } catch {
    return null;
  }
}
