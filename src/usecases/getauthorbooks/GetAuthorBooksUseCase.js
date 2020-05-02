import {getAuthorBooks} from "../../api/bookpublishing";

export class GetAuthorBooksUseCase {

    constructor(authenticatedUserRepository) {
        this._authenticatedUserRepository = authenticatedUserRepository
    }

    execute() {
        return getAuthorBooks(this._authenticatedUserRepository.getUser())
    }
}