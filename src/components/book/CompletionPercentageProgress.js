import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    progressBarIncomplete: {
        backgroundColor: theme.palette.warning.dark
    }, progressBarComplete: {
        backgroundColor: theme.palette.success.main
    }, progressBackground: {
        backgroundColor: theme.palette.action
    }
}));

const CompletionPercentageProgress = ({progress}) => {
    const classes = useStyles();

    const barColorPrimaryClass = progress === 100 ? classes.progressBarComplete : classes.progressBarIncomplete;

    return (
        <LinearProgress variant="determinate" value={progress} classes={{
            barColorPrimary: barColorPrimaryClass, colorPrimary: classes.progressBackground,
        }}/>
    )
};

export default CompletionPercentageProgress