import instance from "./config";

const TABLE_NAME = "comments";

export const get = (productId, page, limit = 0) => {
    let url = `/${TABLE_NAME}/?productId=${productId}&_expand=user&_sort=id&_order=desc`;
    if (limit) url += `&_page=${page}&_limit=${limit}`;
    return instance.get(url);
};
