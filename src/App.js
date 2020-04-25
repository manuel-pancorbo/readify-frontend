import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from './components/header/Header';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import Home from "./views/home/Home";
import NotFound from "./views/notfound/NotFound";
import axios from 'axios';
import Login from "./views/login/Login";
import SignUp from "./views/signup/SignUp";
import Footer from "./components/footer/Footer";
import SignUpSuccess from "./views/signupsuccess/SignUpSuccess";
import PrivateRoute from "./components/privateroute/PrivateRoute";
import UserProfile from "./views/userprofile/UserProfile";
import {AuthContext} from "./context/auth";
import Logout from "./views/logout/Logout";
import {AuthenticatedUserRepository} from "./services/auth/AuthenticatedUserRepository";

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const App = () => {
    console.log(new AuthenticatedUserRepository().getUser());
    return <AuthContext.Provider value={new AuthenticatedUserRepository().getUser()}>
        <ThemeProvider theme={createMuiTheme({palette: {type: 'light'}})}><CssBaseline/>
            <Router>
                <Header/>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route exact path="/login">
                        <Login/>
                    </Route>
                    <Route exact path="/sign-up">
                        <SignUp/>
                    </Route>
                    <Route exact path="/sign-up/success">
                        <SignUpSuccess/>
                    </Route>
                    <Route exact path="/books/{bookId}">
                        <h1>Book detail</h1>
                    </Route>
                    <Route exact path="/logout">
                        <Logout/>
                    </Route>
                    <PrivateRoute exact path="/profile" component={UserProfile}/>
                    <Route path="*">
                        <NotFound/>
                    </Route>
                </Switch>
                <Footer/>
            </Router>
        </ThemeProvider>
    </AuthContext.Provider>;
};

export default App;
