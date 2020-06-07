import {postUser} from "../../api/userprofile";

export class SignUpUseCase {
    execute(user) {
        try {
            this.validateUser(user);
            return postUser(user)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    validateUser(user) {
        if (user.hasOwnProperty('username') && user.username.length > 20) {
            throw new Error("invalid username");
        }
        if (user.hasOwnProperty('email') && user.email.length > 50) {
            throw new Error("invalid email");
        }
        if (user.hasOwnProperty('image') && user.image.length > 100) {
            throw new Error("invalid avatar");
        }
        if (user.hasOwnProperty('password') && user.password.length < 5) {
            throw new Error("invalid password");
        }
    }
}