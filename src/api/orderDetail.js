import instance from "./config";

const TABLE_NAME = "orderDetails";

export const get = (id) => {
    const url = `/${TABLE_NAME}/?orderId=${id}&_expand=product&_expand=topping&_expand=size`;
    return instance.get(url);
};

export const add = (data) => {
    const url = `/${TABLE_NAME}`;
    return instance.post(url, data);
};