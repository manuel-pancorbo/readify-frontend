import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {AuthenticatedUserRepository} from "../../services/auth/AuthenticatedUserRepository";
import {PostBookUseCase} from "../../usecases/postbook/PostBookUseCase";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import {useAuth} from "../../context/auth";
import PostBookPreview from "../../components/postbook/PostBookPreview";
import BookForm from "../../components/postbook/BookForm";

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex', flexDirection: 'column', alignItems: 'center',
    }, submit: {
        margin: theme.spacing(3, 0, 2),
    }, mainContainer: {
        marginTop: theme.spacing(8)
    }, backdrop: {
        zIndex: theme.zIndex.drawer + 1, color: '#fff'
    }
}));

const PostBook = () => {
    const classes = useStyles();
    const [book, setBook] = useState(null);
    const author = useAuth();
    const [loading, setLoading] = useState(false);

    function postBook(bookData) {
        setLoading(true);
        new PostBookUseCase(new AuthenticatedUserRepository()).execute({
            title: bookData['title'],
            cover: bookData['cover'],
            price: bookData['price'],
            tags: bookData['tags'],
            summary: bookData['summary']
        })
            .then((bookId) => {
                setLoading(false)
                window.location.href = `/my-publications/${bookId}`
            })
            .catch((error) => {
                setLoading(false)
                console.error(error)
            })
    }

    return (<Container component="main" className={classes.mainContainer}>
        <Grid container spacing={5} justify={"center"} direction={"row"}>
            <Grid item xs={12} sm={6} md={5}>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h4">
                        Write a new book
                    </Typography>"
                    <BookForm book={book} onSubmit={(book) => postBook(book)} onBookChange={(book) => setBook(book)} action={"create"}/>
                </div>
            </Grid>
            <PostBookPreview book={book} author={author}/>
        </Grid>
        <Backdrop className={classes.backdrop} open={loading}>
            <CircularProgress color="inherit"/>
        </Backdrop>
    </Container>);
}

export default PostBook