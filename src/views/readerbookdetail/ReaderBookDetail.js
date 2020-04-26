import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {GetReaderBookUseCase} from "../../usecases/getreaderbook/GetReaderBookUseCase";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import ChapterCard from "../../components/book/ChapterCard";
import BookDiscussion from "../../components/book/BookDiscussion";
import BookDetailsCard from "../../components/book/BookDetailsCard";

const useStyles = makeStyles((theme) => ({
    bookContainer: {
        position: "relative", marginTop: "20px"
    }, chaptersContainer: {
        marginTop: "25px"
    }, fab: {
        margin: 0, top: 'auto', right: 40, bottom: 40, left: 'auto', position: 'fixed', width: 90, height: 90,
    }, backdrop: {
        zIndex: theme.zIndex.drawer + 1, color: '#fff',
    }
}));

const ReaderBookDetail = ({bookId}) => {
    const classes = useStyles();
    const [book, setBook] = useState(null);
    const [openBackdrop, setOpenBackdrop] = useState(false);

    useEffect(() => {
        setOpenBackdrop(true);
        new GetReaderBookUseCase().execute(bookId)
            .then((book) => {
                setOpenBackdrop(false);
                setBook(book);
            })
            .catch(() => (window.location.href = "/not-found"));
    }, []);

    if (!book) {
        return <Backdrop className={classes.backdrop} open={openBackdrop}>
            <CircularProgress color="inherit"/>
        </Backdrop>
    }

    return (<Container maxWidth={"md"} className={classes.bookContainer}>
        <BookDetailsCard book={book}/>
        <Grid container alignItems={"center"} justify="center" spacing={3} className={classes.chaptersContainer}>
            {book.chapters.map((chapter) => {
                return <ChapterCard chapter={chapter} bookId={bookId}/>
            })}
        </Grid>
        <BookDiscussion bookId={book.id} bookTitle={book.title}/>
        <Fab color="primary" aria-label="add" size={"large"} className={classes.fab}>
            <ShoppingCartIcon/>
        </Fab>
    </Container>)
};

export default ReaderBookDetail