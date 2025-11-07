
import admin from 'firebase-admin';

// This function dynamically imports and initializes firebase-admin
// to ensure it's only ever used on the server.
async function initializeAdmin() {
  if (admin.apps.length > 0) {
    return admin;
  }

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

  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error: any) {
    if (!/already exists/i.test(error.message)) {
      console.error('Firebase Admin Initialization Error: ', error.message);
    }
  }
  
  return admin;
}


// Export a getter for adminAuth that initializes on first access
let _adminAuth: admin.auth.Auth | undefined;

export const adminAuth = {
  get: async () => {
    if (!_adminAuth) {
      const adminInstance = await initializeAdmin();
      _adminAuth = adminInstance.auth();
    }
    return _adminAuth;
  }
};
