import {postBook} from "../../api/bookpublishing";

export class PostBookUseCase {

    constructor(authenticatedUserRepository) {
        this._authenticatedUserRepository = authenticatedUserRepository
    }

    execute(book) {
        book.tags = this.sanitizeTags(book.tags)

        return postBook(this._authenticatedUserRepository.getUser(), book)
    }

    sanitizeTags = (tags) => {
        return tags.filter(tag => tag !== "")
    }
}