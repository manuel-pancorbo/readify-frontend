import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from './components/header/Header';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import Home from "./views/home/Home";
import NotFound from "./views/notfound/NotFound";
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const App = () => (<ThemeProvider theme={createMuiTheme({palette: {type: 'light'}})}><CssBaseline/>
    <Router>
        <Header/>
        <Switch>
            <Route exact path="/">
                <Home/>
            </Route>
            <Route exact path="/login" para>
                <h1>Login page</h1>
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
    </Router>

</ThemeProvider>);

export default App;
