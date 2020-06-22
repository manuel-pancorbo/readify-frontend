import React, {useEffect, useState} from "react";
import Container from "@material-ui/core/Container";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import {makeStyles} from "@material-ui/core/styles";
import {AuthenticatedUserRepository} from "../../services/auth/AuthenticatedUserRepository";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {GetReaderBooksUseCase} from "../../usecases/getreaderbooks/GetReaderBooksUseCase";
import ReaderBookCard from "../../components/readerbook/ReaderBookCard";
import Button from "@material-ui/core/Button";

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
    }, mainActionContainer: {
        marginTop: '40px', display: "flex"
    }, mainActionButton: {
        margin: "auto"
    }
}));

const MyBooks = () => {
    const classes = useStyles();
    const [books, setBooks] = useState(null);
    const [openBackdrop, setOpenBackdrop] = useState(false);

    useEffect(() => {
        setOpenBackdrop(true);
        new GetReaderBooksUseCase(new AuthenticatedUserRepository()).execute()
            .then((books) => setBooks(books))
            .catch((error) => console.error(error))
            .finally(() => setOpenBackdrop(false))
    }, []);

    const noBooksText = <React.Fragment>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
            Parece que aún no has comprado ningún libro, ¿te animas?
        </Typography>
        <div className={classes.mainActionContainer}>
            <Button href="/" variant="contained" color="primary" size={"large"} classes={{
                root: classes.MuiButtonRoot
            }} className={classes.mainActionButton}>Explorar</Button>
        </div>
    </React.Fragment>

    if (!books && !openBackdrop) {
        setOpenBackdrop(true)
    }

    return <Container maxWidth="md" component="main" className={classes.main}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            Mis libros
        </Typography>
        {(!books || books.length === 0) && noBooksText}
        {books && <Grid container spacing={5} className={classes.booksContainer}>
            {books.map((book) => <Grid item key={book.id} className={classes.bookContainer}>
                <ReaderBookCard book={book} author={book.author}/>
            </Grid>)}
        </Grid>}
        <Backdrop className={classes.backdrop} open={openBackdrop}>
            <CircularProgress color="inherit"/>
        </Backdrop>
    </Container>
}

export default MyBooks