import axios from "axios";

export const getUserById = (userId) => {
    return axios.get(`/v1/users/${userId}`)
        .then((response) => Promise.resolve(response.data))
        .catch(() => Promise.reject(new Error(`error fetching user with id ${userId}`)))
};

export const getUsersByIds = (userIds) => {
    if (!userIds || userIds.length === 0) {
        return Promise.resolve([])
    }

    return axios.get("/v1/users", {params: {ids: userIds.join(",")}})
        .then((response) => Promise.resolve(response.data.users))
};

export const postUser = (user) => {
    return axios.post('/v1/users', {
        fullName: user['fullName'], email: user['email'], password: user['password'], image: user['image'], username: user['username']
    })
        .then(() => Promise.resolve())
        .catch(() => Promise.reject(new Error("error creating user")))
};