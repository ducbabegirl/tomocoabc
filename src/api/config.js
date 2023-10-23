import axios from "axios";

const instance = axios.create({
    baseURL: "https://qop133.sse.codesandbox.io",
    headers: {
        "Content-Type": "application/json",
    },
});

export default instance;