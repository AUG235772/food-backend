const db = require('../config/firebase');

const Restaurant = {
    create: async (data) => {
        const restaurantRef = db.collection('restaurants').doc();
        await restaurantRef.set(data);
        return { id: restaurantRef.id, ...data };
    },
    findAll: async () => {
        const restaurantRef = db.collection('restaurants');
        const snapshot = await restaurantRef.get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
};

module.exports = Restaurant;
