import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0, padding: 0, listStyle: 'none',
        },
    }, heroContent: {
        padding: theme.spacing(8, 0, 6),
    },
    loginContainer: {
        marginTop: '40px',
        display: "flex"
    },
    MuiButtonRoot: {
        width: '40%',
        marginLeft: "auto",
        marginRight: "auto"
    }
}));

const PaymentCanceled = () => {
    const classes = useStyles();

    return (<Container maxWidth="sm" component="main" className={classes.heroContent}>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Tu compra ha sido cancelada
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" component="p">
                Lamentamos que finalmente no hayas comprado el libro, aunque ¡estamos seguros de que encontrarás otros mejores!
            </Typography>

            <div className={classes.loginContainer}>
                <Button href="/" variant="contained" color="primary" size={"large"} classes={{
                    root: classes.MuiButtonRoot
                }}>Explorar</Button>
            </div>
        </Container>)
};

export default PaymentCanceled