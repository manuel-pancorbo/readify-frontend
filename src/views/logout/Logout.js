import React from "react";
import {Redirect} from "react-router-dom";
import {removeUser} from "../../services/auth/LocalStorageUserRepository";

const Logout = () => {
    removeUser("user")

    return (
        <Redirect to={"/"} />
    )
}

export default Logout