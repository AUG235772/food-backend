const db = require('../config/firebase');

const User = {
    create: async (data) => {
        const userRef = db.collection('users').doc();
        await userRef.set(data);
        return { id: userRef.id, ...data };
    },
    findOne: async (mobileNumber) => {
        const userRef = db.collection('users');
        const snapshot = await userRef.where('mobileNumber', '==', mobileNumber).get();
        if (snapshot.empty) {
            return null;
        }
        const user = snapshot.docs[0].data();
        return { id: snapshot.docs[0].id, ...user };
    },
    updateLastActivity: async (id) => {
        const userRef = db.collection('users').doc(id);
        await userRef.update({ lastActivity: new Date() });
    }
};

module.exports = User;
