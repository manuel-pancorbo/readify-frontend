import {postBookChapter} from "../../api/bookpublishing";

export class PostBookChapterUseCase {

    constructor(authenticatedUserRepository) {
        this._authenticatedUserRepository = authenticatedUserRepository
    }

    execute(book, chapter) {
        return postBookChapter(this._authenticatedUserRepository.getUser(), book, chapter)
    }
}