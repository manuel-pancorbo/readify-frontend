import {getBook} from "../../api/readerlibrary";
import {getUserById} from "../../api/userprofile";

export class GetReaderBookUseCase {
    execute(bookId) {
       return getBook(bookId)
           .then((book) => {
               console.error(book);
               return Promise.all([book, getUserById(book.authorId)])
           })
           .then(([book, author]) => {
               book.author = author
               delete book.authorId
               return Promise.resolve(book)
           })
           .catch((error) => {
               console.error(`Error retrieving book: ${error}`)
               return Promise.reject(error)
           });
    }
}