import instance from "./config";

const TABLE_NAME = "ratings";

export const checkUserRating = (userId, productId) => {
    const url = `/${TABLE_NAME}/?userId=${userId}&productId=${productId}`;
    return instance.get(url);
};

export const add = (data) => {
    const url = `/${TABLE_NAME}`;
    return instance.post(url, data);
};

export const update = (id, data) => {
    const url = `/${TABLE_NAME}/${id}`;
    return instance.patch(url, data);
};

export const get = (productId) => {
    const url = `/${TABLE_NAME}/?productId=${productId}`;
    return instance.get(url);
};