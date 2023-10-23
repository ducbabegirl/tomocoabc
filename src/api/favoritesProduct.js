import instance from "./config";

const TABLE_NAME = "favorites_product";

export const add = (data) => {
    const url = `/${TABLE_NAME}`;
    return instance.post(url, data);
};

// kiểm tra user đã yêu thích sp chưa
export const checkHeart = (userId, productId) => {
    const url = `/${TABLE_NAME}/?userId=${userId}&productId=${productId}`;
    return instance.get(url);
};

export const get = (userId) => {
    const url = `/${TABLE_NAME}/?userId=${userId}&_expand=product&_sort=id&_order=desc`;
    return instance.get(url);
};

export const getAll = (userId) => {
    const url = `/${TABLE_NAME}/?userId=${userId}`;
    return instance.get(url);
};

export const remove = (id) => {
    const url = `/${TABLE_NAME}/${id}`;
    return instance.delete(url);
};