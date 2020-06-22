import React, {useEffect, useState} from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import {CompletePaymentUseCase} from "../../usecases/completepayment/AttemptChapterPaymentUseCase";
import {AuthenticatedUserRepository} from "../../services/auth/AuthenticatedUserRepository";

const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0, padding: 0, listStyle: 'none',
        },
    }, heroContent: {
        padding: theme.spacing(8, 0, 6),
    }, loginContainer: {
        marginTop: '40px', display: "flex"
    }, MuiButtonRoot: {
        width: '40%', marginLeft: "auto", marginRight: "auto"
    }, backdrop: {
        zIndex: theme.zIndex.drawer + 1, color: '#ffffff',
    }
}));

const PaymentSuccess = () => {
    const classes = useStyles();
    const [openBackdrop, setOpenBackdrop] = useState(false);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        setOpenBackdrop(true);
        new CompletePaymentUseCase(new AuthenticatedUserRepository())
            .execute(queryParams.get("session_id"))
            .then(() => setOpenBackdrop(false))
            .catch((error) => console.log(error));
    }, []);

    return (<Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            Tu compra ha sido procesada
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
            ¡Desde este momento ya puedes empezar a leer el libro que has comprado!
        </Typography>

        <div className={classes.loginContainer}>
            <Button href="/my-books" variant="contained" color="primary" size={"large"} classes={{
                root: classes.MuiButtonRoot
            }}>Mis libros</Button>
        </div>
        <Backdrop className={classes.backdrop} open={openBackdrop}>
            <CircularProgress color="inherit"/>
        </Backdrop>
    </Container>)
};

export default PaymentSuccess