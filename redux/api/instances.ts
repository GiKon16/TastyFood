import axios from "axios"

export const instanceAxiosClose = () => {
    return axios.create({
        baseURL: "http://localhost:3000/api/",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${ String(localStorage.getItem("ACCESS_TOKEN")) }`,
        },
    })
}

export const instanceAxiosOpen = () => {
    return axios.create({
        baseURL: "http://localhost:3000/api/",
        headers: {
            ContentType: "application/json",
        },
    })
}