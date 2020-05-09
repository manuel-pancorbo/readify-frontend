import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    chapterContainer: {
        width: "100%", padding: "20px"
    }, chapterAction: {
        display: "block", margin: "auto", marginTop: "10px"
    }
}));

const AuthorChapterCard = ({chapter, bookId}) => {
    const classes = useStyles();
    const isPublished = () => chapter.status === "published"

    return <Grid item xs={12} container key={chapter.id}>
        <Paper elevation={5} className={classes.chapterContainer}>
            <Grid container spacing={2} direction={"row"} alignItems={"center"} justify={"center"} alignContent={"center"}>
                <Grid item xs={12} md={2}>
                    <Chip color={isPublished() ? "primary" : "secondary"} label={chapter.status} />
                </Grid>
                <Grid item xs={12} md={7}>
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
                            <Typography variant={"h5"} component={"span"} className={classes.price}>{chapter.price}€</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" href={`/my-publications/${bookId}/chapters/${chapter.id}/edit`}
                                    style={{display: "block", margin: "auto", marginTop: "10px"}}>
                                Editar
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    </Grid>
}

export default AuthorChapterCard