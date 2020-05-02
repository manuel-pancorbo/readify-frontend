import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import {makeStyles} from "@material-ui/core/styles";

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
    }
}));

const PostBookPreview = ({title, cover, price, summary, tags, author}) => {
    const classes = useStyles();

    return <Grid item xs={12} sm={6} md={5} className={classes.preview}>
        <Grid container direction={"column"}>
            <Grid item className={classes.titlePreview}>
                <Typography component={"h2"} variant={"h4"}>{!title ? 'Title preview' : title}</Typography>
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
            <Grid item>
                <img className={classes.coverPreview} alt="book cover" src={!cover ? 'default-cover.jpg' : cover }/>
            </Grid>
            <Grid container direction={"row"} alignItems={"center"} className={classes.tagContainer} spacing={1}>
                { (!tags ? "tags preview" : tags).split(" ").map((tag) => <Grid key={tag} item>
                    <Chip
                        size="large"
                        label={tag}
                        clickable
                        color="primary"
                        key={tag}
                    />
                </Grid>)}
            </Grid>
            <Grid item className={classes.pricePreview} justify={"end"}>
                <Typography variant={"h5"} component={"span"}>{!price ? "0,00" : price}€</Typography>
            </Grid>
            <Typography variant={"h5"} className={classes.summaryPreview}>
                Resumen
            </Typography>
            <Typography variant={"body1"} className={classes.summaryPreview}>
                {summary}
            </Typography>
        </Grid>
    </Grid>
}

export default PostBookPreview