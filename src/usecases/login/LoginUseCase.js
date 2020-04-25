import {getToken} from "../../api/authentication";
import {getUserById} from "../../api/userprofile";
import * as jwt from "jsonwebtoken";

export class LoginUseCase {

    constructor(authenticatedUserRepository) {
        this._authenticatedUserRepository = authenticatedUserRepository
    }

    execute(userIdentifier, password) {
        return getToken(userIdentifier, password)
            .then((token) => {
                this._authenticatedUserRepository.saveToken(token);
                return getUserById(jwt.decode(token).iss);
            })
            .then((user) => {
                this._authenticatedUserRepository.saveUser(user);
                return Promise.resolve()
            })
            .catch((error) => {
                this._authenticatedUserRepository.clear();
                return Promise.reject(error)
            });
    }
}