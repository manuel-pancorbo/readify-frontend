import {editBookChapter} from "../../api/bookpublishing";

export class EditBookChapterUseCase {

    constructor(authenticatedUserRepository) {
        this._authenticatedUserRepository = authenticatedUserRepository
    }

    execute(book, chapter) {
        return editBookChapter(this._authenticatedUserRepository.getUser(), book, chapter)
    }
}