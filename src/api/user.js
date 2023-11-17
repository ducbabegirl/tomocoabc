import instance from "./config";

const TABLE_NAME = "users";

export const register = (user) => {
    const url = "/register";
    return instance.post(url, user);
};

export const login = (user) => {
    const url = "/login";
    return instance.post(url, user);
};

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

export const search = (key, stt = 0) => {
    let url = `/${TABLE_NAME}/?q=${key}`;

    if (stt) url += `&active=${stt}`;
    return instance.get(url);
};


export const sortUserByOrder = (page, limit = 0) => {
    let url = `/${TABLE_NAME}/?_sort=id&_order=desc`;
    if (limit) url += `&_page=${page}&_limit=${limit}`;

    return instance.get(url);
};



// export const getTopBuyingUsers = async (page, limit = 0) => {
//     let url = `/${TABLE_NAME}?_embed=orders`;
//     const res = instance.get(url);
//     console.log(res);
// };


export const getTopBuyingUsers = async (page, limit = 0) => {
    let url = `/${TABLE_NAME}?_embed=orders`;
    if (limit) url += `&_page=${page}&_limit=${limit}`;
    try {
        const res = await instance.get(url);
        const users = res.data;
        const sortedUsers = users.sort((a, b) => b.orders.length - a.orders.length);
        return sortedUsers;
    } catch (error) {
        console.error(error);
    }
};


// export const getTop5BuyingUsers = async () => {
//     let url = `/${TABLE_NAME}?_embed=orders`; 
//     try {
//         const res = await instance.get(url);
//         const users = res.data;
//         const sortedUsers = users.sort((a, b) => b.orders.length - a.orders.length);
//         const topFiveUsers = sortedUsers.slice(0, 5);
//         return topFiveUsers;
//     } catch (error) {
//         console.error(error);
//     }
// };

export const getTop5BuyingUsers = async () => {
    let url = `/${TABLE_NAME}?_embed=orders`;
    try {
        const res = await instance.get(url);
        const users = res.data;

        // Lọc ra các đơn hàng có status là 3
        const ordersWithStatus3 = users.map(user => ({
            ...user,
            orders: user.orders.filter(order => order.status === 3)
        }));

        // Sắp xếp người dùng theo số lượng đơn hàng có status là 3
        const sortedUsers = ordersWithStatus3.sort((a, b) => b.orders.length - a.orders.length);

        // Chọn ra top 5 người mua
        const topFiveUsers = sortedUsers.slice(0, 5);

        return topFiveUsers;
    } catch (error) {
        console.error(error);
    }
};