import {getReaderPayments} from "../../api/readerlibrary";

export class GetReaderPaymentsUseCase {

    constructor(authenticatedUserRepository) {
        this._authenticatedUserRepository = authenticatedUserRepository
    }

    execute() {
        return getReaderPayments(this._authenticatedUserRepository.getUser())
    }
}