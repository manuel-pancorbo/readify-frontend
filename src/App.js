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
import ReaderBookDetail from "./views/readerbookdetail/ReaderBookDetail";
import PaymentCanceled from "./views/paymentcanceled/PaymentCanceled";
import PaymentSuccess from "./views/paymentsuccess/PaymentSuccess";
import PostBook from "./views/postbook/PostBook";
import MyPublications from "./views/mypublications/MyPublications";
import EditBook from "./views/editbook/EditBook";

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const App = () => {
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
                    <Route exact path="/payments/success">
                        <PaymentSuccess/>
                    </Route>
                    <Route exact path="/payments/canceled">
                        <PaymentCanceled/>
                    </Route>
                    <Route
                        path="/books/:bookId"
                        render={({match}) => {
                            return (<ReaderBookDetail bookId={match.params.bookId}/>)
                        }}
                    />
                    <Route exact path="/logout">
                        <Logout/>
                    </Route>
                    <PrivateRoute exact path="/profile" component={UserProfile}/>
                    <PrivateRoute exact path="/my-publications" component={MyPublications}/>
                    <PrivateRoute exact path="/post-book" component={PostBook}/>
                    <PrivateRoute
                        exact path="/my-publications/:bookId/edit"
                        component={({match}) => {
                            return (<EditBook bookId={match.params.bookId}/>)
                        }}
                    />
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
