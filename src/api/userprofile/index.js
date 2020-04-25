import axios from "axios";

export const getUserById = (userId) => {
    return axios.get(`/v1/users/${userId}`)
        .then((response) => Promise.resolve(response.data))
        .catch(() => Promise.reject(new Error(`error fetching user with id ${userId}`)))
};