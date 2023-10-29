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