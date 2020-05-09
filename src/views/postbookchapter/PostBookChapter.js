import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import 'react-markdown-editor-lite/lib/index.css';
import {GetAuthorBookByIdUseCase} from "../../usecases/getauthorbookbyid/GetAuthorBookByIdUseCase";
import {AuthenticatedUserRepository} from "../../services/auth/AuthenticatedUserRepository";
import {PostBookChapterUseCase} from "../../usecases/postbookchapter/PostBookChapterUseCase";
import ChapterForm from "../../components/chapter/ChapterForm";

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex', flexDirection: 'column', alignItems: 'center',
    }, mainContainer: {
        marginTop: theme.spacing(8)
    }, backdrop: {
        zIndex: theme.zIndex.drawer + 1, color: '#fff'
    }
}));

const PostBookChapter = ({bookId}) => {
    const [loading, setLoading] = useState(false)
    const [book, setBook] = useState(null)
    const [chapter, setChapter] = useState(null)
    const classes = useStyles();

    function postBookChapter(bookChapterData) {
        setLoading(true);
        new PostBookChapterUseCase(new AuthenticatedUserRepository()).execute(book, {
            order: bookChapterData['order'],
            title: bookChapterData['title'],
            price: bookChapterData['price'],
            excerpt: bookChapterData['excerpt'],
            content: bookChapterData['content']
        })
            .then((chapterResponse) => window.location.href = `/my-publications/${bookId}`)
            .catch((error) => console.error(error))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        setLoading(true)
        new GetAuthorBookByIdUseCase(new AuthenticatedUserRepository()).execute(bookId, false)
            .then((book) => setBook(book))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false))
    }, []);

    return <Container maxWidth={"md"} component="main" className={classes.mainContainer}>
        <Grid container spacing={5} justify={"center"} direction={"row"}>
            <Grid item xs={12} sm={12} md={12}>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h4">
                        Post a new chapter for {(book) && book.title}
                    </Typography>
                    <ChapterForm chapter={chapter} action={"create"} onSubmit={postBookChapter} onChange={chapter => setChapter(chapter)}/>
                </div>
            </Grid>
        </Grid>
        <Backdrop className={classes.backdrop} open={loading}>
            <CircularProgress color="inherit"/>
        </Backdrop>
    </Container>
}

export default PostBookChapter
