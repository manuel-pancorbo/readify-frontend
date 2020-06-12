import React from "react";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Book from "./Book";

const BookListing = ({books}) => {
    return (<Grid item xs={12}>
            <Grid container justify="center" spacing={5}>
                {books.map((book) => (<Grid key={book.id} item>
                    <Paper elevation={5}>
                        <Book book={book}/>
                    </Paper>
                </Grid>))}
            </Grid>
        </Grid>);
};

export default BookListing