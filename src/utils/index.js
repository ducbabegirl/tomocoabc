import axios from "axios";

export const reRender = async (component, domElement, id) => {
    if (component) {
        document.querySelector(domElement).innerHTML = await component.render(id);
    }

    if (component.afterRender) await component.afterRender(id);
};
// check login
export const checkLogin = (role) => {
    const user = JSON.parse(localStorage.getItem("auth"));

    if (!user || user.role !== 1 || user.role !== role) {
        window.location.href = "/#/";
    } else {
        window.location.href = "/#/admin";
    }
};

export const getUser = () => {
    const user = JSON.parse(localStorage.getItem("auth"));
    return user;
};

export const saveUser = (uesr) => {
    localStorage.setItem("auth", JSON.stringify(uesr));
};

export const logout = () => {
    document.location.href = "/#/login";
};
// hàm upload image
export const uploadFile = (file) => {
    const CLOUDINARY_NAME = "ddxwrjamy";
    const CLOUDINARY_API = `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`;
    const CLOUDINARY_PRESET = "sim-ninh";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_PRESET);

    const res = axios.post(CLOUDINARY_API, formData, {
        headers: {
            "Content-Type": "application/form-data",
        },
    });

    return res;
};