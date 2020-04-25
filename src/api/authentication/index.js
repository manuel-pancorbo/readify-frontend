import axios from "axios";

export const getToken = (userIdentifier, password) => axios.post('/v1/auth/token', {
    userIdentifier: userIdentifier, password: password,
}).then((response) => Promise.resolve(response.data.token))
    .catch(() => Promise.reject(new Error("invalid credentials")));