import axios from "axios";

export const searchByFilters = (filters) => axios.get('/v1/books', {params: filters})
    .then((response) => Promise.resolve({
        books: response.data.results,
        total: response.data.total
    }))