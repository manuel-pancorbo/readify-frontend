import {getBook} from "../../api/readerlibrary";

export class GetReaderBookUseCase {
    execute(bookId) {
       return getBook(bookId);
    }
}