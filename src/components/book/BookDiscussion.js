import React from "react";
import {DiscussionEmbed} from "disqus-react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    commentsContainer: {
        marginTop: "50px"
    }
}));

const BookDiscussion = ({bookId, bookTitle}) => {
    const classes = useStyles();

    return <DiscussionEmbed
        className={classes.commentsContainer}
        shortname='readify'
        config={{
            identifier: bookId, title: bookTitle,
        }}
    />
};

export default BookDiscussion