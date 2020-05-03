import {getAuthorBookById} from "../../api/bookpublishing";

export class GetAuthorBookByIdUseCase {

    constructor(authenticatedUserRepository) {
        this._authenticatedUserRepository = authenticatedUserRepository
    }

    execute(bookId) {
        return getAuthorBookById(bookId, this._authenticatedUserRepository.getUser())
    }
}