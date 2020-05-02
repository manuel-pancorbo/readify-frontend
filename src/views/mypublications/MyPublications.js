import React, {useEffect, useState} from "react";
import Container from "@material-ui/core/Container";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import {makeStyles} from "@material-ui/core/styles";
import AuthorBookCard from "../../components/authorbook/AuthorBookCard";
import {useAuth} from "../../context/auth";
import {AuthenticatedUserRepository} from "../../services/auth/AuthenticatedUserRepository";
import {GetAuthorBooksUseCase} from "../../usecases/getauthorbooks/GetAuthorBooksUseCase";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import CreateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles((theme) => ({
    main: {
        marginTop: "20px", padding: theme.spacing(5, 0, 6),
    }, backdrop: {
        zIndex: theme.zIndex.drawer + 1, color: '#fff',
    }, breadcrumbs: {
        marginBottom: "25px"
    }, bookContainer: {
        width: "100%"
    }, booksContainer: {
        marginTop: theme.spacing(2)
    }, fab: {
        margin: 0, top: 'auto', right: 40, bottom: 40, left: 'auto', position: 'fixed', width: 90, height: 90,
    }
}));

const MyPublications = () => {
    const classes = useStyles();
    const [books, setBooks] = useState(null);
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const author = useAuth();

    useEffect(() => {
        setOpenBackdrop(true);
        new GetAuthorBooksUseCase(new AuthenticatedUserRepository()).execute()
            .then((books) => setBooks(books))
            .catch((error) => console.error(error))
            .finally(() => setOpenBackdrop(false))
    }, []);

    const noBooksText = <Typography variant="h5" align="center" color="textSecondary" component="p">
        Lorem ipsum dolor sit amet, te vis autem ridens utamur, aperiam impedit apeirian ea eam, nec ei saepe eirmod. Modus
        moderatius cum te, te populo similique nam. Vim at indoctum tincidunt, brute accusam eum ad. Pri modo fugit at, cu vitae
        constituam sea, et usu novum eripuit mediocritatem. Quaestio constituto ius ea.
    </Typography>

    if (!books && !openBackdrop) {
        setOpenBackdrop(true)
    }

    return <Container maxWidth="md" component="main" className={classes.main}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            My publications
        </Typography>
        {!books || books.length === 0 && noBooksText}
        {books && <Grid container spacing={5} className={classes.booksContainer}>
            {books.map((book) => <Grid item key={book.id} className={classes.bookContainer}>
                <AuthorBookCard book={book} author={author}/>
            </Grid>)}
        </Grid>}
        <Backdrop className={classes.backdrop} open={openBackdrop}>
            <CircularProgress color="inherit"/>
        </Backdrop>
        <Fab color="primary" aria-label="add" size={"large"} className={classes.fab} href="/write-book">
            <CreateIcon/>
        </Fab>
    </Container>
}

export default MyPublications