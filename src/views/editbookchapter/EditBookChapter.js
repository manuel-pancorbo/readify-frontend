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
import ChapterForm from "../../components/chapter/ChapterForm";
import {GetAuthorBookChapterByIdUseCase} from "../../usecases/getauthorbookchapterbyid/GetAuthorBookChapterByIdUseCase";
import {EditBookChapterUseCase} from "../../usecases/editbookchapter/EditBookChapterUseCase";

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex', flexDirection: 'column', alignItems: 'center',
    }, mainContainer: {
        marginTop: theme.spacing(8)
    }, backdrop: {
        zIndex: theme.zIndex.drawer + 1, color: '#fff'
    }
}));

const EditBookChapter = ({bookId, chapterId}) => {
    const [loading, setLoading] = useState(false)
    const [book, setBook] = useState(null)
    const [chapter, setChapter] = useState(null)
    const classes = useStyles();

    function editBookChapter(bookChapterData) {
        setLoading(true);
        new EditBookChapterUseCase(new AuthenticatedUserRepository()).execute(book, {
            order: bookChapterData['order'],
            title: bookChapterData['title'],
            price: bookChapterData['price'],
            excerpt: bookChapterData['excerpt'],
            content: bookChapterData['content'],
            status: bookChapterData['status'],
            id: chapterId
        })
            .then(() => window.location.href = `/my-publications/${bookId}`)
            .catch((error) => console.error(error))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        setLoading(true)
        Promise.all([new GetAuthorBookByIdUseCase(new AuthenticatedUserRepository()).execute(bookId),
            new GetAuthorBookChapterByIdUseCase(new AuthenticatedUserRepository()).execute(bookId, chapterId)
        ])
            .then(([book, chapter]) => {
                setBook(book)
                setChapter(chapter)
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false))
    }, []);

    return <Container maxWidth={"md"} component="main" className={classes.mainContainer}>
        <Grid container spacing={5} justify={"center"} direction={"row"}>
            <Grid item xs={12} sm={12} md={12}>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h4">
                        Editar capítulo de {(book) && book.title}
                    </Typography>
                    <ChapterForm action={!chapter ? "create" : "edit"} chapter={chapter} onSubmit={editBookChapter} onChange={setChapter}/>
                </div>
            </Grid>
        </Grid>
        <Backdrop className={classes.backdrop} open={loading}>
            <CircularProgress color="inherit"/>
        </Backdrop>
    </Container>
}

export default EditBookChapter
