import instance from "./config";

const TABLE_NAME = "users";

export const register = (user) => {
    const url = "/register";
    return instance.post(url, user);
};

export const login = (user) => {
    const url = "/login";
    return instance.post(url, user);
};

export const update = (id, data) => {
    const url = `/${TABLE_NAME}/${id}`;
    return instance.patch(url, data);
};

export const search = (key, stt = 0) => {
    let url = `/${TABLE_NAME}/?q=${key}`;

    if (stt) url += `&active=${stt}`;
    return instance.get(url);
};