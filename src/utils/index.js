import axios from "axios";

export const reRender = async (component, domElement, id) => {
    if (component) {
        document.querySelector(domElement).innerHTML = await component.render(id);
    }

    if (component.afterRender) await component.afterRender(id);
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