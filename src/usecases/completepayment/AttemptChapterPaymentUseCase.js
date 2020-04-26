import {completePayment} from "../../api/payments";

export class CompletePaymentUseCase {

    constructor(authenticatedUserRepository) {
        this._authenticatedUserRepository = authenticatedUserRepository
    }

    execute(paymentId) {
        const reader = this._authenticatedUserRepository.getUser();

        if (!reader) {
            return Promise.reject(new Error("anonymous user"))
        }

        return completePayment(paymentId, reader);
    }
}