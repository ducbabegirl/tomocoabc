import instance from "./config";


const TABLE_NAME = "products";

export const getAll = (page, limit) => {
    let url = `/${TABLE_NAME}/?_sort=id&_order=desc`;
    if (limit) url += `&_page=${page}&_limit=${limit}`;
    return instance.get(url);
};
export const remove = (id) => {
    const url = `/${TABLE_NAME}/${id}`;
    return instance.delete(url);
};
export const adminSearch = (key, stt = 0) => {
    let url = `/${TABLE_NAME}/?q=${key}&_sort=id&_order=desc`;

    if (stt) url += `&status=${stt}`;
    return instance.get(url);
};

