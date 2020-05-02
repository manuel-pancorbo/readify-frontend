import React from "react";
import {Route} from "react-router-dom";
import {useAuth} from "../../context/auth";

const PrivateRoute = ({component: Component, ...rest}) => {
    const isAuthenticated = useAuth();

    if (!isAuthenticated) {
        window.location.href = "/login?redirectTo=" + rest.path
    }

    return (<Route {...rest} render={props => <Component {...props} />} />);
};

export default PrivateRoute