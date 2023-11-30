import instance from "./config";

const TABLE_NAME = "sizes";

export const getAll = () => {
    const url = `/${TABLE_NAME}/?_sort=name&_order=desc`;
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



export const getSizeByName = (name) => {
    const url = `/${TABLE_NAME}?name=${name}`;
    return instance.get(url);
};


export const getSizeByNameEdit = (name,id) => {
    const url = `/${TABLE_NAME}?name=${name}&id_ne=${id}`;
    return instance.get(url);
};