import instance from "./config";

const TABLE_NAME = "news";

export const getAll = (page, limit) => {
    let url = `/${TABLE_NAME}/?_sort=id&_order=desc`;
    if (limit) url += `&_page=${page}&_limit=${limit}`;
    return instance.get(url);
};

// ds bài viết ở trạng thái hiển thị
export const getAllShow = (start, limit = 0) => {
    let url = `/${TABLE_NAME}/?status_ne=0&_sort=id&_order=desc`;
    if (limit) url += `&_start=${start}&_limit=${limit}`;
    return instance.get(url);
};

export const get = (id) => {
    const url = `/${TABLE_NAME}/${id}/?_expand=cateNew`;
    return instance.get(url);
};

export const getRelated = (id, cateId, start, limit = 0) => {
    let url = `/${TABLE_NAME}/?status_ne=0&id_ne=${id}&cateNewId=${cateId}&_sort=id&_order=desc`;
    if (limit) url += `&_start=${start}&_limit=${limit}`;
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

// tin tức theo danh mục
export const getAllByCate = (cateId, start, limit = 0) => {
    let url = `/${TABLE_NAME}/?cateNewId=${cateId}&status_ne=0`;
    if (limit) url += `&_start=${start}&_limit=${limit}`;
    return instance.get(url);
};

export const search = (key, stt = 0) => {
    let url = `/${TABLE_NAME}/?title_like=${key}&_sort=id&_order=desc`;

    if (stt) url += `&status=${stt}`;
    return instance.get(url);
};