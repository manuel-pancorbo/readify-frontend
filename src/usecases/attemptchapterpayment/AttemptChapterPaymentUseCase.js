import {createChapterPayment} from "../../api/payments";
import {redirectToCheckout} from "../../api/stripe";

export class AttemptChapterPaymentUseCase {

    constructor(authenticatedUserRepository) {
        this._authenticatedUserRepository = authenticatedUserRepository
    }

    execute(bookId, chapterId) {
        const reader = this._authenticatedUserRepository.getUser();

        if (!reader) {
            return Promise.reject(new Error("anonymous user"))
        }

        return createChapterPayment(bookId, chapterId, reader)
            .then((sessionId) => redirectToCheckout(sessionId))
    }
}