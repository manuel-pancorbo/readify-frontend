import axios from "axios";

export const getBook = (bookId) => axios.get(`/v1/books/${bookId}`)
    .then((response) => Promise.resolve(response.data))
    .catch(() => Promise.reject(new Error("book not found")));

export const getReaderBook = (reader, bookId) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${reader.token}`
    };

    return axios.get(`/v1/readers/${reader.id}/books/${bookId}`, {headers: headers})
        .then((response) => Promise.resolve(response.data))
        .catch((error) => {
            if (error.response.status === 404) {
                return Promise.resolve({type: "not-bought"})
            }
            return Promise.reject(error)
        })
}

export const getReaderBookChapter = (reader, bookId, chapterId) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${reader.token}`
    };

    return axios.get(`/v1/readers/${reader.id}/books/${bookId}/chapters/${chapterId}`, {headers: headers})
        .then((response) => Promise.resolve(response.data))
}

export const getReaderBooks = (reader) => {
    const headers = {
        'Content-Type': 'application/json', 'Authorization': `Bearer ${reader.token}`
    };

    return axios.get(`/v1/readers/${reader.id}/books`, {headers: headers})
        .then((response) => Promise.resolve(response.data.books))
}

export const getReaderPayments = (reader) => {
    const headers = {
        'Content-Type': 'application/json', 'Authorization': `Bearer ${reader.token}`
    };

    return axios.get(`/v1/readers/${reader.id}/payments`, {headers: headers})
        .then((response) => Promise.resolve(response.data.payments))
}