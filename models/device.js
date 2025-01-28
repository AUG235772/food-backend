const db = require('../config/firebase');

const Device = {
    create: async (data) => {
        const deviceRef = db.collection('devices').doc();
        await deviceRef.set(data);
        return { id: deviceRef.id, ...data };
    },
    findAll: async () => {
        const deviceRef = db.collection('devices');
        const snapshot = await deviceRef.get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    delete: async (id) => {
        const deviceRef = db.collection('devices').doc(id);
        await deviceRef.delete();
    }
};

module.exports = Device;
