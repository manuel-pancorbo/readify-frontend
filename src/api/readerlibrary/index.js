import axios from "axios";

export const getBook = (bookId) => axios.get(`/v1/books/${bookId}`)
    .then((response) => Promise.resolve(response.data))
    .catch(() => Promise.reject(new Error("book not found")));