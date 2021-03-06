import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CompletionPercentageProgress from "../book/CompletionPercentageProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2), margin: 'auto', width: "100%"
    }, cover: {
        maxWidth: "100%", maxHeight: "350", marginRight: "auto", marginLeft: "auto", display: "block",
    }, avatar: {
        width: theme.spacing(5),
        height: theme.spacing(5),
        marginRight: "10px",
        color: theme.palette.getContrastText(theme.palette.secondary.main),
        backgroundColor: theme.palette.secondary.main
    }, title: {
        color: theme.palette.text.secondary, paddingBottom: "15px"
    }, authorName: {
        color: theme.palette.text.primary
    }, bookStatus: {
        backgroundColor: theme.palette.warning.main, color: theme.palette.getContrastText(theme.palette.warning.main), marginRight: "10px"
    }, bookVisibility: {
        backgroundColor: theme.palette.primary.main, color: theme.palette.getContrastText(theme.palette.secondary.main), marginRight: "10px"
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
    }, actionsContainer: {
        marginTop: "20px"
    }
}));

const AuthorBookCard = ({book, author, includeDetailsAction}) => {
    const classes = useStyles();

    function mapStatus(status) {
        if (status === "in_progress") return "En progreso";
        if (status === "finished") return "Completado";
        return null
    }

    function mapVisibility(visibility) {
        if (visibility === "null") return "No publicado";
        if (visibility === "visible") return "Publicado";
        return null
    }

    return <Paper elevation={5}>
        <CompletionPercentageProgress progress={book.completionPercentage}/>
        <Grid container justify="center" alignItems={"center"} className={classes.mainContainer}>
            <Grid item xs={12} sm={4}>
                <img className={classes.cover} alt="book cover" src={book.cover}/>
            </Grid>
            <Grid item xs={12} sm={8}>
                <Grid container spacing={2} className={classes.bookDetails}>
                    <Grid item xs={12}>
                        <Typography variant="h4" component={"h1"} className={classes.title}>
                            {book.title}
                        </Typography>
                        <Grid container direction={"row"} alignItems={"center"}>
                            <Grid item>
                                <Avatar
                                    src={author.image}
                                    className={classes.avatar}
                                    alt={author.fullName}>
                                    {author.fullName.charAt(0)}
                                </Avatar>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6" component={"h2"} className={classes.authorName}>
                                    {author.fullName}
                                </Typography>
                            </Grid>
                            <Grid item className={classes.bookStatusContainer}>
                                <Chip className={classes.bookStatus} label={mapStatus(book.status)}/>
                                <Chip className={classes.bookVisibility} label={mapVisibility(book.visibility)}/>
                            </Grid>
                            <Grid item>
                                <Typography variant={"h5"} component={"span"}
                                            className={classes.price}>{book.price}€</Typography>
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
                        <Grid container className={classes.summary}>
                            <Grid item xs={12} className={classes.summaryHeader}>
                                <Typography variant={"h5"}>Resumen</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant={"body1"}>
                                    {book.summary}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container className={classes.actionsContainer} spacing={2} justify={"flex-end"}>
                            {includeDetailsAction && <Grid item className={classes.action}>
                                <Button variant="contained" color="primary" onClick={() => {window.location.href = `/my-publications/${book.id}`}}>
                                    Detalles
                                </Button>
                            </Grid>}
                            <Grid item className={classes.action}>
                                <Button variant="contained" color="primary" onClick={() => {window.location.href = `/my-publications/${book.id}/edit`}}>
                                    Editar
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Paper>
};

export default AuthorBookCard