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

// get voucher theo mã
export const getByCode = (voucher) => {
    const url = `/${TABLE_NAME}/?code=${voucher}`;
    return instance.get(url);
};

export const search = (keyword) => {
    const url = `/${TABLE_NAME}/?code_like=${keyword}`;
    return instance.get(url);
};


export const getVoucherByName = (name) => {
    const url = `/${TABLE_NAME}?code=${name}`;
    return instance.get(url);
};


export const getVoucherByNameEdit = (name,id) => {
    const url = `/${TABLE_NAME}?code=${name}&id_ne=${id}`;
    return instance.get(url);
};