import instance from "./config";

const TABLE_NAME = "orders";

export const getAll = (page, limit = 0) => {
    let url = `/${TABLE_NAME}/?_sort=id&_order=desc`;
    if (limit) url += `&_page=${page}&_limit=${limit}`;
    return instance.get(url);
};

export const get = (id) => {
    const url = `/${TABLE_NAME}/${id}`;
    return instance.get(url);
};

export const add = (data) => {
    const url = `/${TABLE_NAME}`;
    return instance.post(url, data);
};

export const remove = (id) => {
    const url = `/${TABLE_NAME}/${id}`;
    return instance.delete(url);
};

export const update = (id, data) => {
    const url = `/${TABLE_NAME}/${id}`;
    return instance.patch(url, data);
};

export const getByUserId = (userId, page, limit = 0) => {
    let url = `/${TABLE_NAME}/?userId=${userId}&_sort=id&_order=desc`;
    if (limit) url += `&_page=${page}&_limit=${limit}`;
    return instance.get(url);
};

export const search = (key, stt, userId = 0) => {
    let url = `/${TABLE_NAME}/?_sort=id&_order=desc`;
    if (key) url += `&q=${key}`;

    if (stt) url += `&status=${stt}`;

    if (userId) url += `&userId=${userId}`;

    return instance.get(url);
};


export const getTopBuyingUsers = async (page, limit = 0) => {
    let url = `/${TABLE_NAME}/?_embed=orderDetails`;
    if (limit) url += `&_start=${start}&_limit=${limit}`;
    const ordersResponse = await instance.get(url);
    const userPurchaseMap = {};
    ordersResponse.data.forEach(order => {
        order.orderDetails.forEach(orderDetail => {
            const userId = order.userId;
            const quantity = orderDetail.quantity;

            if (userPurchaseMap[userId]) {
                userPurchaseMap[userId] += quantity;
            } else {
                userPurchaseMap[userId] = quantity;
            }
        });
    });
    const usersWithTotalPurchase = Object.keys(userPurchaseMap).map(userId => ({
        userId,
        totalPurchase: userPurchaseMap[userId],
    }));

    const sortedUsers = usersWithTotalPurchase.sort((a, b) => b.totalPurchase - a.totalPurchase);

    return sortedUsers;
};



// export const getOrdersInLast24Hours = async () => {
//     try {
//         const response = await getAll();
//         const allOrders = response.data;
//         const currentTime = new Date();
//         const ordersInLast24Hours = allOrders.filter(order => {
//             const orderTime = new Date(order.createdAt);
            
//             const timeDifference = currentTime - orderTime;

//             const hoursDifference = timeDifference / (1000 * 60 * 60);
//             return hoursDifference <= 24;
//         });

//         return ordersInLast24Hours;
//     } catch (error) {
//         console.error(error);
//     }
// };


export const getOrdersInLast24Hours = async () => {
    try {
        const response = await getAll();
        const allOrders = response.data;

        // Ensure that allOrders is an array
        if (!Array.isArray(allOrders)) {
            throw new Error('Invalid data format: Orders should be an array');
        }

        const currentTime = new Date();
        const ordersInLast24Hours = allOrders.filter(order => {
            const orderTime = new Date(order.createdAt);

            // Ensure that createdAt is a valid date
            if (isNaN(orderTime.getTime())) {
                console.warn('Invalid date format in order:', order);
                return false;
            }

            const timeDifference = currentTime - orderTime;
            const hoursDifference = timeDifference / (1000 * 60 * 60);
            
            return hoursDifference <= 24;
        });

        return ordersInLast24Hours;
    } catch (error) {
        console.error(error);
    }
};



export const getOrdersInCurrentDay = async () => {
    try {
        const response = await getAll();
        const allOrders = response.data;

        if (!Array.isArray(allOrders)) {
            throw new Error('Invalid data format: Orders should be an array');
        }

        const currentTime = new Date();
        const startOfDay = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), 0, 0, 0);
        const endOfDay = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), 23, 59, 59);
        
        startOfDay.setHours(0, 0, 0, 0);
        endOfDay.setHours(23, 59, 59, 999);
        
        const ordersInCurrentDay = allOrders.filter(order => {
            const orderTime = new Date(order.createdAt);
            if (isNaN(orderTime.getTime())) {
                console.warn('Invalid date format in order:', order);
                return false;
            }
            orderTime.setHours(0, 0, 0, 0);

            return orderTime >= startOfDay && orderTime <= endOfDay;
        });

        return ordersInCurrentDay;
    } catch (error) {
        console.error(error);
    }
};
