import instance from "./config";

const TABLE_NAME = "categories";

export const getAll = (page, limit) => {
    let url = `/${TABLE_NAME}/?_sort=id&_order=desc`;
    if (limit) url += `&_page=${page}&_limit=${limit}`;
    return instance.get(url);
};