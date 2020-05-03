import {editBook} from "../../api/bookpublishing";

export class EditBookUseCase {

    constructor(authenticatedUserRepository) {
        this._authenticatedUserRepository = authenticatedUserRepository
    }

    execute(book) {
        book.tags = this.sanitizeTags(book.tags)

        return editBook(this._authenticatedUserRepository.getUser(), book)
    }

    sanitizeTags = (tags) => {
        return tags.filter(tag => tag !== "")
    }
}