import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

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
        setTimeout(() => {
            setOpenBackdrop(false)
        }, 1000);
    };

    return (<React.Fragment>
        <Button variant="contained" color="secondary" onClick={handleOnClick} style={{display: "block", margin: "auto", marginTop: "10px"}}>
            Comprar
        </Button>
            <Backdrop className={classes.backdrop} open={openBackdrop}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        </React.Fragment>
    )
};

export default BuyChapterButton