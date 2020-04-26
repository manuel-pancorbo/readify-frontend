import axios from "axios";

export const createChapterPayment = (bookId, chapterId, reader) => {
    const data = {
        book: bookId,
        chapter: chapterId
    };

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${reader.token}`
    };

    return axios.post(`/v1/readers/${reader.id}/payments`, data, { headers: headers })
        .then((response) => Promise.resolve(response.data.id))
        .catch((error) => Promise.reject(error))
};

export const createBookPayment = (bookId, reader) => {
    const data = {
        book: bookId
    };

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${reader.token}`
    };

    return axios.post(`/v1/readers/${reader.id}/payments`, data, { headers: headers })
        .then((response) => Promise.resolve(response.data.id))
        .catch((error) => Promise.reject(error))
};

export const completePayment = (paymentId, reader) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${reader.token}`
    };

    return axios.patch(`/v1/readers/${reader.id}/payments/${paymentId}`, {}, { headers: headers })
        .then((response) => Promise.resolve(response.data.id))
        .catch((error) => Promise.reject(error))
};