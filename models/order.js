const db = require('../config/firebase');

const Order = {
    create: async (data) => {
        const orderRef = db.collection('orders').doc();
        await orderRef.set(data);
        return { id: orderRef.id, ...data };
    },
    findAll: async () => {
        const orderRef = db.collection('orders');
        const snapshot = await orderRef.get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
};

module.exports = Order;
