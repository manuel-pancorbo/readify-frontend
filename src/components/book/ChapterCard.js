import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import BuyChapterButton from "./BuyChapterButton";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
    chapterContainer: {
        width: "100%", padding: "20px"
    }, chapterAction: {
        display: "block", margin: "auto", marginTop: "10px"
    }
}));

const ChapterCard = ({chapter, bookId, isAcquiredByReader}) => {
    const classes = useStyles();

    const action = () => {
        if (isAcquiredByReader) {
            return <Button variant="contained" color="primary" href={"/read/chapter"}
                           style={{display: "block", margin: "auto", marginTop: "10px"}}>
                Leer
            </Button>
        } else {
            return <BuyChapterButton bookId={bookId} chapterId={chapter.id}/>
        }
    }

    return (<Grid item xs={12} container key={chapter.id}>
        <Paper elevation={5} className={classes.chapterContainer}>
            <Grid container direction={"row"} alignItems={"center"} justify={"center"} alignContent={"center"}>
                <Grid item xs={12} md={9}>
                    <Grid container direction={"column"}>
                        <Grid item>
                            <Typography variant={"overline"}> {chapter.order}. {chapter.title} </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant={"body2"}> {chapter.excerpt} </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Grid container direction={"column"} alignContent={"center"} alignItems={"center"}>
                        <Grid item xs={12}>
                            <Typography variant={"h5"} component={"span"} className={classes.price}>{chapter.price.amount}€</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            {action()}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    </Grid>)
};

export default ChapterCard