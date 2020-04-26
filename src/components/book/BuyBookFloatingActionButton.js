import React, {useState} from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import {makeStyles} from "@material-ui/core/styles";
import {AuthenticatedUserRepository} from "../../services/auth/AuthenticatedUserRepository";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Fab from "@material-ui/core/Fab";
import {AttemptBookPaymentUseCase} from "../../usecases/attemptbookpayment/AttemptBookPaymentUseCase";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1, color: '#ffffff',
    }, fab: {
        margin: 0, top: 'auto', right: 40, bottom: 40, left: 'auto', position: 'fixed', width: 90, height: 90,
    }
}));

const BuyBookFloatingActionButton = ({bookId}) => {
    const classes = useStyles();
    const [openBackdrop, setOpenBackdrop] = useState(false);

    const handleOnClick = () => {
        setOpenBackdrop(true);
        new AttemptBookPaymentUseCase(new AuthenticatedUserRepository())
            .execute(bookId)
            .then(() => setOpenBackdrop(false))
            .catch(() => window.location.href = "/login" )
    };

    return (<React.Fragment>
        <Fab color="primary" aria-label="add" size={"large"} className={classes.fab} onClick={handleOnClick}>
            <ShoppingCartIcon/>
        </Fab>
        <Backdrop className={classes.backdrop} open={openBackdrop}>
            <CircularProgress color="inherit"/>
        </Backdrop>
    </React.Fragment>)
};

export default BuyBookFloatingActionButton