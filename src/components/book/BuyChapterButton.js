import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import {makeStyles} from "@material-ui/core/styles";
import {AuthenticatedUserRepository} from "../../services/auth/AuthenticatedUserRepository";
import {AttemptChapterPaymentUseCase} from "../../usecases/attemptchapterpayment/AttemptChapterPaymentUseCase";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1, color: '#ffffff',
    }
}));

const BuyChapterButton = ({bookId, chapterId}) => {
    const classes = useStyles();
    const [openBackdrop, setOpenBackdrop] = useState(false);

    const handleOnClick = () => {
        setOpenBackdrop(true);
        new AttemptChapterPaymentUseCase(new AuthenticatedUserRepository()).execute(bookId, chapterId)
            .then(() => setOpenBackdrop(false))
            .catch((error) => console.error(error))
    };

    return (<React.Fragment>
            <Button variant="contained" color="secondary" onClick={handleOnClick}
                    style={{display: "block", margin: "auto", marginTop: "10px"}}>
                Comprar
            </Button>
            <Backdrop className={classes.backdrop} open={openBackdrop}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        </React.Fragment>)
};

export default BuyChapterButton