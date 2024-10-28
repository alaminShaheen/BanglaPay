import logging from "@/utils/logging";
import {
    FIREBASE_API_KEY,
    FIREBASE_APP_ID,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_PROJECT_ID,
    FIREBASE_SERVICE_AUTH_PROVIDER_X509_CERT_URL,
    FIREBASE_SERVICE_AUTH_URI,
    FIREBASE_SERVICE_CLIENT_EMAIL,
    FIREBASE_SERVICE_CLIENT_ID,
    FIREBASE_SERVICE_CLIENT_X509_CERT_URL,
    FIREBASE_SERVICE_PRIVATE_KEY,
    FIREBASE_SERVICE_PRIVATE_KEY_ID,
    FIREBASE_SERVICE_TOKEN_URI,
    FIREBASE_SERVICE_TYPE,
    FIREBASE_SERVICE_UNIVERSE_DOMAIN,
    FIREBASE_STORAGE_BUCKET
} from "@/configs/config";
import { cert, initializeApp as initializeAdminApp } from "firebase-admin/app";
import { initializeApp } from "firebase/app";


const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID
};

const firebaseServiceConfig = {
    type: FIREBASE_SERVICE_TYPE,
    projectId: FIREBASE_PROJECT_ID,
    private_key_id: FIREBASE_SERVICE_PRIVATE_KEY_ID,
    private_key: FIREBASE_SERVICE_PRIVATE_KEY,
    client_email: FIREBASE_SERVICE_CLIENT_EMAIL,
    client_id: FIREBASE_SERVICE_CLIENT_ID,
    auth_uri: FIREBASE_SERVICE_AUTH_URI,
    token_uri: FIREBASE_SERVICE_TOKEN_URI,
    auth_provider_x509_cert_url: FIREBASE_SERVICE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: FIREBASE_SERVICE_CLIENT_X509_CERT_URL,
    universe_domain: FIREBASE_SERVICE_UNIVERSE_DOMAIN
};


export function initFirebase() {
    initializeApp(firebaseConfig);
    initializeAdminApp({ credential: cert(firebaseServiceConfig) });
    logging.log("Firebase initialized");
}

