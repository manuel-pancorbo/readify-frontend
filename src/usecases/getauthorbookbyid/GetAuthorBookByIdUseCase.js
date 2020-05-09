import {getAuthorBookById, getAuthorBookChapterById, getAuthorBookChaptersByBookId} from "../../api/bookpublishing";

export class GetAuthorBookByIdUseCase {

    constructor(authenticatedUserRepository) {
        this._authenticatedUserRepository = authenticatedUserRepository
    }

    execute(bookId, includeChapters) {
        const author = this._authenticatedUserRepository.getUser();
        if (!includeChapters) {
            return getAuthorBookById(bookId, author)
        }

        return Promise.all([getAuthorBookById(bookId, author), getAuthorBookChaptersByBookId(bookId, author)])
            .then(([book, chapters]) => {
                book.chapters = chapters
                return Promise.resolve(book)
            })
    }
}