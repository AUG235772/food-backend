const db = require('../config/firebase');

const Admin = {
    create: async (data) => {
        const adminRef = db.collection('admins').doc();
        await adminRef.set(data);
        return { id: adminRef.id, ...data };
    },
    findOne: async (username) => {
        const adminRef = db.collection('admins');
        const snapshot = await adminRef.where('username', '==', username).get();
        if (snapshot.empty) {
            return null;
        }
        const admin = snapshot.docs[0].data();
        return { id: snapshot.docs[0].id, ...admin };
    }
};

module.exports = Admin;
