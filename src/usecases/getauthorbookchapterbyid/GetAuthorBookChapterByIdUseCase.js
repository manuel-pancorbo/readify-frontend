import {getAuthorBookChapterById} from "../../api/bookpublishing";

export class GetAuthorBookChapterByIdUseCase {

    constructor(authenticatedUserRepository) {
        this._authenticatedUserRepository = authenticatedUserRepository
    }

    execute(bookId, chapterId) {
        return getAuthorBookChapterById(bookId, chapterId, this._authenticatedUserRepository.getUser())
    }
}