import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import {makeStyles} from "@material-ui/core/styles";
import CompletionPercentageProgress from "../book/CompletionPercentageProgress";

const useStyles = makeStyles((theme) => ({
    avatar: {
        margin: theme.spacing(1), backgroundColor: theme.palette.secondary.main, width: 40 + "px", height: 40 + "px"
    }, titlePreview: {
        marginBottom: theme.spacing(2)
    }, coverPreview: {
        maxWidth: "100%", maxHeight: "400px", marginRight: "auto", marginLeft: "auto", display: "block",
    }, tagContainer: {
        marginTop: theme.spacing(3)
    }, pricePreview: {
        marginTop: theme.spacing(3)
    }, summaryPreview: {
        marginTop: theme.spacing(3)
    }, preview: {
        color: theme.palette.text.secondary
    }, author: {
        marginBottom: theme.spacing(2), fontSize: "1rem"
    }, bookVisibility: {
        marginLeft: "auto", marginBottom: "15px"
    }
}));

const PostBookPreview = ({book, author}) => {
    const classes = useStyles();
    const isBookVisible = () => book.visibility === "visible"
    const defaultBook = {
        title: "Título", cover: "default-cover.jpg", tags: ["etiqueta1", "etiqueta2"], price: "0.00", summary: "", completionPercentage: 0, visibility: "null"
    }

    book = {...defaultBook, ...book}

    return <Grid item xs={12} sm={6} md={5} className={classes.preview}>
        <CompletionPercentageProgress progress={book.completionPercentage}/>
        <Grid container direction={"column"}>
            <Grid item className={classes.titlePreview}>
                <Typography component={"h2"} variant={"h4"}>{book.title}</Typography>
            </Grid>
            <Grid container direction={"row"} alignItems={"center"} className={classes.author}>
                <Grid item>
                    <Avatar
                        src={author.image}
                        className={classes.avatar}
                        alt={author.fullName}>
                        {author.fullName.charAt(0)}
                    </Avatar>
                </Grid>
                <Grid item>
                    <Typography variant={"subtitle1"} component={"span"} className={classes.authorName}>
                        {author.fullName}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item className={classes.bookVisibility}>
                <Chip color={ isBookVisible() ? "primary" : "secondary"} className={classes.visibility}
                      label={ isBookVisible() ? "Publicado" : "No publicado"}/>
            </Grid>
            <Grid item>
                <img className={classes.coverPreview} alt="book cover" src={book.cover}/>
            </Grid>
            <Grid container direction={"row"} alignItems={"center"} className={classes.tagContainer} spacing={1}>
                {book.tags.map((tag) => <Grid key={tag} item>
                    <Chip
                        label={tag}
                        clickable
                        color="primary"
                        key={tag}
                    />
                </Grid>)}
            </Grid>
            <Grid item className={classes.pricePreview}>
                <Typography variant={"h5"} component={"span"}>{book.price}€</Typography>
            </Grid>
            <Typography variant={"h5"} className={classes.summaryPreview}>
                Resumen
            </Typography>
            <Typography variant={"body1"} className={classes.summaryPreview}>
                {book.summary}
            </Typography>
        </Grid>
    </Grid>
}

export default PostBookPreview