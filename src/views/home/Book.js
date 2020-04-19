import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import Truncate from "react-truncate";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import AddIcon from '@material-ui/icons/Add';
import Fab from "@material-ui/core/Fab";

const useStyles = makeStyles(() => ({
    root: {
        maxWidth: 345,
    }, media: {
        cursor: "pointer",
        maxWidth: '100%',
        maxHeight: 400 + "px",
        width: "auto",
        height: "auto",
        marginLeft: "auto",
        marginRight: "auto",
        display: "block",
    }, expand: {
        marginRight: 'auto',
    }, expandOpen: {
        transform: 'rotate(180deg)',
    }, tagLink: {
        textDecoration: "none",
    }, avatar: {
        backgroundColor: red[500],
    }, price: {
        fontSize: "bold"
    }, tags: {
        marginTop: 15 + "px",
    }, tag: {
        marginRight: 5 + "px",
    }, bookStatus: {
        display: "flex", justifyContent: "flex-end", marginRight: 15 + "px", marginTop: 15 + "px",
    }
}));

const Book = ({book}) => {
    const classes = useStyles();

    function mapStatus(status) {
        if (status === "in_progress") return "En progreso"
        if (status === "finished") return "Completado"
        return null
    }

    function setTag(value) {
        let urlSearchParams = new URLSearchParams(window.location.search);
        urlSearchParams.set("tags", value)

        window.location.href = "/?" + urlSearchParams.toString();
    }

    return (<Card className={classes.root} xs={6}>
        <CardMedia
            className={classes.media}
            component={"img"}
            image={book.cover}
            title={book.title}
            onClick={() => {
                window.location.href = '/books/' + book.id
            }}
        />
        <CardHeader
            avatar={<Avatar
                src={"data:image/jpeg;base64,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"}
                className={classes.avatar}>
            </Avatar>}
            title={book.title}
            subheader="J.K. Rowling"
        />
        <Divider/>
        <div className={classes.bookStatus}>
            <Chip variant="outlined" color="primary" label={mapStatus(book.status)}/>
        </div>
        <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
                <Truncate lines={6} ellipsis={<span>... <a href={'/books/' + book.id}>Leer más</a></span>}>
                    {book.summary}
                </Truncate>
            </Typography>
            <div className={classes.tags}>
                {book.tags.map(value => {
                    return (<Chip
                        size="small"
                        label={value}
                        clickable
                        color="primary"
                        key={value}
                        className={classes.tag}
                        onClick={() => {
                            setTag(value)
                        }}
                    />)
                })}
            </div>
        </CardContent>
        <CardActions disableSpacing>
            <IconButton
                className={classes.expand}
            >
                <LocalOfferIcon/><span className={classes.price}>{book.price.amount} €</span>
            </IconButton>
            <Fab color="secondary" aria-label="details" size="large" href={"/books/" + book.id}>
                <AddIcon/>
            </Fab>
        </CardActions>
    </Card>);
}

export default Book
