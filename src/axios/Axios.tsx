import axios from "axios";

const instance = axios.create({
    baseURL:'https://localhost:7001',
    responseType: "json",
    headers: {
        "Content-Type": "application/json",
    },
});


export default instance;