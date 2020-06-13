import {getReaderBooks} from "../../api/readerlibrary";
import {getUsersByIds} from "../../api/userprofile";

export class GetReaderBooksUseCase {

    constructor(authenticatedUserRepository) {
        this._authenticatedUserRepository = authenticatedUserRepository
    }

    execute() {
        return getReaderBooks(this._authenticatedUserRepository.getUser())
            .then(readerBooks => Promise.all([readerBooks, getUsersByIds(readerBooks.map(book => book.authorId))]))
            .then(([readerBooks, users]) => {
                readerBooks = readerBooks.map(book => this.mergeBookAndAuthor(book, users))
                return Promise.resolve(readerBooks)
            })
    }

    mergeBookAndAuthor(book, authors) {
        book.author = authors.filter(author => author.id === book.authorId)[0]
        delete book.authorId
        return book
    }
}