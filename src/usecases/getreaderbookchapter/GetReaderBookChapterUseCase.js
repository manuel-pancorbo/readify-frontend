import {getReaderBookChapter} from "../../api/readerlibrary";

export class GetReaderBookChapterUseCase {

    constructor(authenticatedUserRepository) {
        this._authenticatedUserRepository = authenticatedUserRepository
    }

    execute(bookId, chapterId) {
        return getReaderBookChapter(this._authenticatedUserRepository.getUser(), bookId, chapterId)
    }
}