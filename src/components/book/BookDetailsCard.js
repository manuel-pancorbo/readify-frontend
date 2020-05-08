import React from "react";
import CompletionPercentageProgress from "./CompletionPercentageProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2), margin: 'auto'
    }, cover: {
        maxWidth: "100%", maxHeight: "400px", marginRight: "auto", marginLeft: "auto", display: "block",
    }, avatar: {
        width: theme.spacing(5), height: theme.spacing(5), marginRight: "10px", color: theme.palette.getContrastText(theme.palette.secondary.main), backgroundColor: theme.palette.secondary.main
    }, title: {
        color: theme.palette.text.secondary, paddingBottom: "15px"
    }, authorName: {
        color: theme.palette.text.primary
    }, bookStatus: {
        backgroundColor: theme.palette.warning.main, color: "#FFFFFF", marginRight: "10px"
    }, bookStatusContainer: {
        marginLeft: "auto"
    }, summary: {
        marginTop: "20px"
    }, summaryHeader: {
        marginBottom: "10px"
    }, tagContainer: {
        marginTop: "20px"
    }, bookDetails: {
        padding: "20px"
    }
}));

const BookDetailsCard = ({book}) => {
    const classes = useStyles();

    function mapStatus(status) {
        if (status === "in_progress") return "En progreso";
        if (status === "finished") return "Completado";
        return null
    }

    return <Paper elevation={5}>
        <CompletionPercentageProgress progress={book.completionPercentage}/>
        <Grid container alignItems={"center"} justify="center">
            <Grid item xs={12} sm={4}>
                <img className={classes.cover} alt="book cover" src={book.cover}/>
            </Grid>
            <Grid item xs={12} sm={8}>
                <Grid container spacing={2} className={classes.bookDetails}>
                    <Grid item>
                        <Typography variant="h4" component={"h1"} className={classes.title}>
                            {book.title}
                        </Typography>
                        <Grid container direction={"row"} alignItems={"center"}>
                            <Grid item>
                                <Avatar
                                    src={book.author.image}
                                    className={classes.avatar}
                                    alt={book.author.fullName}>
                                    {book.author.fullName.charAt(0)}
                                </Avatar>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6" component={"h2"} className={classes.authorName}>
                                    {book.author.fullName}
                                </Typography>
                            </Grid>
                            <Grid item className={classes.bookStatusContainer}>
                                <Chip className={classes.bookStatus} label={mapStatus(book.status)}/>
                            </Grid>
                            <Grid item>
                                <Typography variant={"h5"} component={"span"}
                                            className={classes.price}>{book.price.amount}€</Typography>
                            </Grid>
                        </Grid>
                        <Grid container direction={"row"} alignItems={"center"} className={classes.tagContainer} spacing={1}>
                            {book.tags.map((tag) => <Grid key={tag} item>
                                <Chip
                                    size="small"
                                    label={tag}
                                    clickable
                                    color="primary"
                                    key={tag}
                                />
                            </Grid>)}
                        </Grid>
                        <Grid container className={classes.summary} direction={"column"}>
                            <Grid item className={classes.summaryHeader}>
                                <Typography variant={"h5"}>Resumen</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant={"body1"}>
                                    {book.summary}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Paper>
};

export default BookDetailsCard