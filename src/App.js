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

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const App = () => (<ThemeProvider theme={createMuiTheme({palette: {type: 'light'}})}><CssBaseline/>
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
            <Route exact path="/mybooks">
                <h1>My books page</h1>
            </Route>
            <Route path="*">
                <NotFound/>
            </Route>
        </Switch>
        <Footer/>
    </Router>

</ThemeProvider>);

export default App;
