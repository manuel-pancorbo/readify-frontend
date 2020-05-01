import {searchByFilters} from "../../api/search";
import {getUsersByIds} from "../../api/userprofile";

export class SearchBooksByFilters {
    execute(filters) {
        return searchByFilters(filters)
            .then(searchResponse => Promise.all([searchResponse, getUsersByIds(searchResponse.books.map(book => book.authorId))]))
            .then(([searchResponse, users]) => {
                searchResponse.books = searchResponse.books.map(book => this.mergeBookAndAuthor(book, users))
                return Promise.resolve(searchResponse)
            })
    }

    mergeBookAndAuthor(book, authors) {
        book.author = authors.filter(author => author.id === book.authorId)[0]
        delete book.authorId
        return book
    }
}