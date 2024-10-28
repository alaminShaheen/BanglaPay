import dotenv from "dotenv";
import * as process from "node:process";

dotenv.config();

export const DEVELOPMENT = process.env.NODE_ENV === "development";
export const TEST = process.env.NODE_ENV === "test";

export const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
export const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;
export const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "";

export const GOOGLE_SHEET_ID = String(process.env.GOOGLE_SHEET_ID) || "";
export const GOOGLE_SERVICE_ACCOUNT_EMAIL = String(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) || "";
export const GOOGLE_PRIVATE_KEY = String(process.env.GOOGLE_PRIVATE_KEY) || "";

export const FIREBASE_API_KEY = String(process.env.FIREBASE_API_KEY) || "";
export const FIREBASE_AUTH_DOMAIN = String(process.env.FIREBASE_AUTH_DOMAIN) || "";
export const FIREBASE_PROJECT_ID = String(process.env.FIREBASE_PROJECT_ID) || "";
export const FIREBASE_STORAGE_BUCKET = String(process.env.FIREBASE_STORAGE_BUCKET) || "";
export const FIREBASE_MESSAGING_SENDER_ID = String(process.env.FIREBASE_MESSAGING_SENDER_ID) || "";
export const FIREBASE_APP_ID = String(process.env.FIREBASE_APP_ID) || "";

export const FIREBASE_SERVICE_TYPE = String(process.env.FIREBASE_SERVICE_TYPE) || "";
export const FIREBASE_SERVICE_PRIVATE_KEY_ID = String(process.env.FIREBASE_SERVICE_PRIVATE_KEY_ID) || "";
export const FIREBASE_SERVICE_PRIVATE_KEY = String(process.env.FIREBASE_SERVICE_PRIVATE_KEY) || "";
export const FIREBASE_SERVICE_CLIENT_EMAIL = String(process.env.FIREBASE_SERVICE_CLIENT_EMAIL) || "";
export const FIREBASE_SERVICE_CLIENT_ID = String(process.env.FIREBASE_SERVICE_CLIENT_ID) || "";
export const FIREBASE_SERVICE_AUTH_URI = String(process.env.FIREBASE_SERVICE_AUTH_URI) || "";
export const FIREBASE_SERVICE_TOKEN_URI = String(process.env.FIREBASE_SERVICE_TOKEN_URI) || "";
export const FIREBASE_SERVICE_AUTH_PROVIDER_X509_CERT_URL = String(process.env.FIREBASE_SERVICE_AUTH_PROVIDER_X509_CERT_URL) || "";
export const FIREBASE_SERVICE_CLIENT_X509_CERT_URL = String(process.env.FIREBASE_SERVICE_CLIENT_X509_CERT_URL) || "";
export const FIREBASE_SERVICE_UNIVERSE_DOMAIN = String(process.env.FIREBASE_SERVICE_UNIVERSE_DOMAIN) || "";