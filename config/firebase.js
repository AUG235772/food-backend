const admin = require('firebase-admin');
const serviceAccount = require('../path/to/your/servesmart-services-firebase-adminsdk-fbsvc-3c580ec9a1.json'); // Download this from Firebase Console

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = db;
