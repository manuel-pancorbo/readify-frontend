import React, {useEffect, useState} from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import BookDetailsCard from "../../components/book/BookDetailsCard";
import Grid from "@material-ui/core/Grid";
import ChapterCard from "../../components/book/ChapterCard";
import BookDiscussion from "../../components/book/BookDiscussion";
import BuyBookFloatingActionButton from "../../components/book/BuyBookFloatingActionButton";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import AuthorBookCard from "../../components/authorbook/AuthorBookCard";
import {useAuth} from "../../context/auth";
import {AuthenticatedUserRepository} from "../../services/auth/AuthenticatedUserRepository";
import {GetAuthorBookByIdUseCase} from "../../usecases/getauthorbookbyid/GetAuthorBookByIdUseCase";
import Skeleton from "@material-ui/lab/Skeleton";
import AuthorChapterCard from "../../components/authorchapter/AuthorChapter";
import CreateIcon from "@material-ui/icons/Create";
import Fab from "@material-ui/core/Fab";

const useStyles = makeStyles((theme) => ({
    bookContainer: {
        position: "relative", marginTop: "20px"
    }, chaptersContainer: {
        marginTop: "25px"
    }, backdrop: {
        zIndex: theme.zIndex.drawer + 1, color: '#fff',
    }, breadcrumbs: {
        marginBottom: "25px"
    }, fab: {
        margin: 0, top: 'auto', right: 40, bottom: 40, left: 'auto', position: 'fixed', width: 90, height: 90,
    }
}));

const AuthorBookDetails = ({bookId}) => {
    const classes = useStyles();
    const [book, setBook] = useState(null);
    const author = useAuth();

    useEffect(() => {
        new GetAuthorBookByIdUseCase(new AuthenticatedUserRepository()).execute(bookId, true)
            .then((book) => setBook(book))
            .catch((error) => console.error(error))
    }, []);

    return <Container maxWidth={"md"} className={classes.bookContainer}>
        <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
            <Link color="inherit" href="/my-publications">My publications</Link>
            {book ? <Typography color="textPrimary">{book.title}</Typography> : <Skeleton variant={"text"}/>}
        </Breadcrumbs>
        {book && <AuthorBookCard book={book} author={author} includeDetailsAction={false} />}
        {book && <Grid container alignItems={"center"} justify="center" spacing={3} className={classes.chaptersContainer}>
            {book.chapters.map((chapter) => {
                return <AuthorChapterCard key={chapter.id} chapter={chapter} bookId={bookId}/>
            })}
        </Grid>}
        {book && <BookDiscussion bookId={book.id} bookTitle={book.title}/>}
        <Fab color="primary" aria-label="add" size={"large"} className={classes.fab} href={`/my-publications/${bookId}/post-chapter`}>
            <CreateIcon/>
        </Fab>
    </Container>
}

export default AuthorBookDetails