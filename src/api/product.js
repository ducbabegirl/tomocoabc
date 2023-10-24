import instance from "./config";

import { get as getTopping } from "./topping";
import { get as getSize } from "./size";

const TABLE_NAME = "products";

export const getAll = (page, limit) => {
    let url = `/${TABLE_NAME}/?_sort=id&_order=desc`;
    if (limit) url += `&_page=${page}&_limit=${limit}`;
    return instance.get(url);
};

// ds sp trạng thái hiển thị
export const getAllJoinCategory = (start, limit = 0) => {
    let url = `/${TABLE_NAME}/?_expand=category&status_ne=0&_sort=id&_order=desc&_embed=ratings`;
    if (limit) url += `&_start=${start}&_limit=${limit}`;
    return instance.get(url);
};

// tìm kiếm
export const search = (keyword, start, limit = 0) => {
    let url = `/${TABLE_NAME}/?q=${keyword}&status_ne=0&_expand=category&_embed=ratings`;
    if (limit) url += `&_start=${start}&_limit=${limit}`;
    return instance.get(url);
};

// bài viết liên quan
export const getRelated = (id, cateId, start, limit = 0) => {
    let url = `/${TABLE_NAME}/?status_ne=0&id_ne=${id}&categoryId=${cateId}&_expand=category&_sort=id&_order=desc&_embed=ratings`;
    if (limit) url += `&_start=${start}&_limit=${limit}`;
    return instance.get(url);
};

export const updateView = (id, data) => {
    const url = `/${TABLE_NAME}/${id}`;
    return instance.patch(url, data);
};

export const get = (id) => {
    const url = `/${TABLE_NAME}/${id}/?_expand=category&_embed=ratings`;
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

// sản phẩm yêu thích
export const getFavorites = () => {
    const url = `/${TABLE_NAME}/?_sort=favorites&_order=desc&_start=0&_limit=10&status_ne=0`;
    return instance.get(url);
};

// lọc sp
export const getAllByFilter = async (sort, listId) => {
    let queryString = "";
    listId.forEach((id, index) => {
        if (index === 0) {
            queryString += `?id=${id}`;
        } else {
            queryString += `&id=${id}`;
        }
    });

    if (sort) {
        const sortArr = sort.split("-");
        queryString += `&_sort=${sortArr[0]}&_order=${sortArr[1]}`;
    } else {
        queryString += "&_sort=id&_order=desc";
    }

    const url = `/${TABLE_NAME}/${queryString}&_expand=category&_embed=ratings`;
    return instance.get(url);
};

// sp theo danh mục
export const getProductByCate = (cateId, start, limit = 0) => {
    let url = `/${TABLE_NAME}/?categoryId=${cateId}&status_ne=0&_sort=id&_order=desc&_expand=category&_embed=ratings`;
    if (limit) url += `&_start=${start}&_limit=${limit}`;
    return instance.get(url);
};

export const getPrice = async (productId, toppingId, sizeId, qnt) => {
    let totalPrice = 0;
    // get giá sp
    const { data: { price } } = await get(productId);

    if (qnt) {
        totalPrice += price * qnt;
    } else {
        totalPrice += price;
    }

    // get giá topping
    if (toppingId) {
        const { data: { price: toppingPrice } } = await getTopping(toppingId);
        totalPrice += toppingPrice;
    }

    // get giá size
    if (sizeId) {
        const { data: { priceIncrease: sizePrice } } = await getSize(sizeId);
        totalPrice += sizePrice;
    }

    return totalPrice;
};

export const getAllCmt = () => {
    const url = `/${TABLE_NAME}/?_embed=comments&_sort=id&_order=desc`;
    return instance.get(url);
};

export const adminSearch = (key, stt = 0) => {
    let url = `/${TABLE_NAME}/?q=${key}&_sort=id&_order=desc`;

    if (stt) url += `&status=${stt}`;
    return instance.get(url);
};