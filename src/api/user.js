import instance from "./config";

const TABLE_NAME = "users";

export const login = (user) => {
    const url = "/login";
    return instance.post(url, user);
};