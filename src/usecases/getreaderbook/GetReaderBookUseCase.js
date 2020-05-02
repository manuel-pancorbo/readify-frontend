import {getBook, getReaderBook} from "../../api/readerlibrary";
import {getUserById} from "../../api/userprofile";

export class GetReaderBookUseCase {

    constructor(authenticatedUserRepository) {
        this._authenticatedUserRepository = authenticatedUserRepository
    }

    execute(bookId) {
        return getBook(bookId)
            .then((book) => Promise.all([book, getUserById(book.authorId)]))
            .then(([book, author]) => {
                book.author = author
                delete book.authorId
                return Promise.resolve(book)
            })
            .then((book) => {
                const reader = this._authenticatedUserRepository.getUser()

                if (!reader) {
                    return Promise.resolve(book)
                }

                return Promise.all([book, getReaderBook(reader, book.id)])
            })
            .then(([book, readerBook]) => {
                book.readerOwnership = readerBook
                return Promise.resolve(book)
            })
    }
}