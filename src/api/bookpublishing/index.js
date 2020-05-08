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

export const editBook = (author, book) => {
    const httpBook = {
        title: book.title,
        cover: book.cover,
        price: {amount: book.price, currency: "EUR"},
        tags: book.tags,
        summary: book.summary,
        completionPercentage: book.completionPercentage,
        visibility: book.visibility
    }

    const headers = {
        'Content-Type': 'application/json', 'Authorization': `Bearer ${author.token}`
    };

    return axios.patch(`/v1/authors/${author.id}/books/${book.id}`, httpBook, {headers: headers})
        .then(() => Promise.resolve())
}

export const getAuthorBooks = (author) => {
    const headers = {
        'Content-Type': 'application/json', 'Authorization': `Bearer ${author.token}`
    };

    return axios.get(`/v1/authors/${author.id}/books`, {headers: headers})
        .then((response) => Promise.resolve(response.data.books))
}

export const getAuthorBookById = (bookId, author) => {
    const headers = {
        'Content-Type': 'application/json', 'Authorization': `Bearer ${author.token}`
    };

    return axios.get(`/v1/authors/${author.id}/books/${bookId}`, {headers: headers})
        .then((response) => {
            let book = response.data
            book.price = book.price.amount
            return Promise.resolve(response.data)
        })
}

export const postBookChapter = (author, book, chapter) => {
    const httpBook = {
        title: chapter.title,
        order: chapter.order,
        price: {amount: chapter.price, currency: "EUR"},
        excerpt: chapter.excerpt,
        content: chapter.content,
    }

    const headers = {
        'Content-Type': 'application/json', 'Authorization': `Bearer ${author.token}`
    };

    return axios.post(`/v1/authors/${author.id}/books/${book.id}/chapters`, httpBook, {headers: headers})
        .then((response) => Promise.resolve(response.data))
}
