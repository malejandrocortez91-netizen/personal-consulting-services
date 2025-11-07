
import admin from 'firebase-admin';

// Check if we are in a server environment before proceeding
if (typeof window === 'undefined') {
  const serviceAccount = {
    type: process.env.FIREBASE_ADMIN_TYPE,
    project_id: process.env.FIREBASE_ADMIN_PROJECT_ID,
    private_key_id: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_ADMIN_CLIENT_ID,
    auth_uri: process.env.FIREBASE_ADMIN_AUTH_URI,
    token_uri: process.env.FIREBASE_ADMIN_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_ADMIN_CLIENT_X509_CERT_URL,
  } as admin.ServiceAccount;
  
  // Initialize app only if it's not already initialized
  if (!admin.apps.length) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    } catch (error: any) {
        // This catch block will prevent the app from crashing if credentials are not perfectly set
        // during local development. It's useful for avoiding startup errors.
        console.error('Firebase Admin Initialization Error: ', error.message);
    }
  }
}

// Safely get the auth instance, which will be undefined on the client.
const adminAuth = admin.apps.length ? admin.auth() : undefined;

export { adminAuth };
