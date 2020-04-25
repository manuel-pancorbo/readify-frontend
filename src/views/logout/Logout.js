import {AuthenticatedUserRepository} from "../../services/auth/AuthenticatedUserRepository";

const Logout = () => {
    new AuthenticatedUserRepository().clear();
    window.location.href="/"
};

export default Logout