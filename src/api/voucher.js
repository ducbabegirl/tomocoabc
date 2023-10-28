import instance from "./config";

const TABLE_NAME = "voucher";

export const getAll = (page, limit) => {
    let url = `/${TABLE_NAME}/?_sort=id&_order=desc`;
    if (limit) url += `&_page=${page}&_limit=${limit}`;
    return instance.get(url);
};

export const get = (id) => {
    const url = `/${TABLE_NAME}/${id}`;
    return instance.get(url);
};