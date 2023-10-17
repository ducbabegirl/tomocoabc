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