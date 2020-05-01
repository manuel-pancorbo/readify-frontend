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
        if (status === "in_progress") return "En progreso";
        if (status === "finished") return "Completado";
        return null
    }

    function setTag(value) {
        let urlSearchParams = new URLSearchParams(window.location.search);
        urlSearchParams.set("tags", value);

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
                src={book.author.image}
                className={classes.avatar}
                alt={book.author.fullName}
            >
                {book.author.fullName.charAt(0)}
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
};

export default Book
