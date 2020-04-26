import {createBookPayment} from "../../api/payments";
import {redirectToCheckout} from "../../api/stripe";

export class AttemptBookPaymentUseCase {

    constructor(authenticatedUserRepository) {
        this._authenticatedUserRepository = authenticatedUserRepository
    }

    execute(bookId) {
        const reader = this._authenticatedUserRepository.getUser();

        if (!reader) {
            return Promise.reject(new Error("anonymous user"))
        }

        return createBookPayment(bookId, reader)
            .then((sessionId) => redirectToCheckout(sessionId))
    }
}