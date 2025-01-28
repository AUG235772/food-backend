const admin = require('firebase-admin');
const serviceAccount = require('./servesmart-services-firebase-adminsdk-fbsvc-3c580ec9a1.json'); // Ensure this path is correct

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = db;
