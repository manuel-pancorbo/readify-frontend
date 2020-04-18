import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Book from "./Book";

const useStyles = makeStyles((theme) => ({
    rootGrid: {
        flexGrow: 1, marginTop: 50 + "px"
    }, paper: {
        height: 140, width: 100,
    }, control: {
        padding: theme.spacing(2),
    },
}));

const BookListing = ({books, total}) => {
    const classes = useStyles();

    return (<Grid container className={classes.rootGrid} spacing={5}>
        <Grid item xs={12}>
            <Grid container justify="center" spacing={5}>
                {books.map((book) => (<Grid key={book.id} item>
                    <Paper elevation={5}>
                        <Book book={book}/>
                    </Paper>
                </Grid>))}
            </Grid>
            {total} libros encontrados
        </Grid>
    </Grid>);
};

export default BookListing