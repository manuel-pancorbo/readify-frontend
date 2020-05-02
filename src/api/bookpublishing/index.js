import axios from "axios";

export const postBook = (author, book) => {
    const httpBook = {
        title: book.title, cover: book.cover, price: {amount: book.price, currency: "EUR"}, tags: book.tags, summary: book.summary,
    }

    const headers = {
        'Content-Type': 'application/json', 'Authorization': `Bearer ${author.token}`
    };

    return axios.post(`/v1/authors/${author.id}/books`, httpBook, {headers: headers})
        .then((response) => Promise.resolve(response.data.id))
}