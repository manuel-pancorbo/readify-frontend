export class AuthenticatedUserRepository {
    getUser = () => {
        try {
            let user = JSON.parse(localStorage.getItem("user"));
            user.token = localStorage.getItem("token");
            return user;
        } catch (e) {
            return null
        }
    };
    saveToken = (token) => localStorage.setItem("token", token);
    saveUser = (userInformation) => localStorage.setItem("user", JSON.stringify(userInformation));

    clear = () => localStorage.clear();
}