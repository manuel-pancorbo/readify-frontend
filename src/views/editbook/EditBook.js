import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {AuthenticatedUserRepository} from "../../services/auth/AuthenticatedUserRepository";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import {useAuth} from "../../context/auth";
import PostBookPreview from "../../components/postbook/PostBookPreview";
import BookForm from "../../components/postbook/BookForm";
import {GetAuthorBookByIdUseCase} from "../../usecases/getauthorbookbyid/GetAuthorBookByIdUseCase";
import {EditBookUseCase} from "../../usecases/editbook/EditBookUseCase";

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex', flexDirection: 'column', alignItems: 'center',
    }, form: {
        marginTop: theme.spacing(3), width: '100%', // Fix IE 11 issue.
    }, submit: {
        margin: theme.spacing(3, 0, 2),
    }, mainContainer: {
        marginTop: theme.spacing(8)
    }, backdrop: {
        zIndex: theme.zIndex.drawer + 1, color: '#fff'
    }
}));

const EditBook = ({bookId}) => {
    const classes = useStyles();
    const [book, setBook] = useState(null)
    const [loading, setLoading] = useState(false);
    const author = useAuth();

    useEffect(() => {
        new GetAuthorBookByIdUseCase(new AuthenticatedUserRepository()).execute(bookId)
            .then((book) => setBook(book))
            .catch((error) => console.error(error))
    }, []);

    function editBook(bookData) {
        setLoading(true)
        new EditBookUseCase(new AuthenticatedUserRepository()).execute({
            id: bookId,
            title: bookData['title'],
            cover: bookData['cover'],
            price: bookData['price'],
            tags: bookData['tags'],
            summary: bookData['summary'],
            visibility: bookData['visibility'],
            completionPercentage: bookData['completionPercentage']
        })
            .then(() => {
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
                        Editing book
                    </Typography>
                    <BookForm book={book} onSubmit={(book) => editBook(book)} onBookChange={(book) => setBook(book)}
                              action={!book ? "create" : "edit"}/>
                </div>
            </Grid>
            <PostBookPreview book={!book ? {} : book} author={author}/>
        </Grid>
        <Backdrop className={classes.backdrop} open={loading}>
            <CircularProgress color="inherit"/>
        </Backdrop>
    </Container>);
}

export default EditBook