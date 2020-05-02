import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useForm} from "react-hook-form";
import {AuthenticatedUserRepository} from "../../services/auth/AuthenticatedUserRepository";
import {PostBookUseCase} from "../../usecases/postbook/PostBookUseCase";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import {useAuth} from "../../context/auth";
import PostBookPreview from "../../components/postbook/PostBookPreview";

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex', flexDirection: 'column', alignItems: 'center',
    }, form: {
        marginTop: theme.spacing(3), width: '100%', // Fix IE 11 issue.
    }, submit: {
        margin: theme.spacing(3, 0, 2),
    }, mainContainer: {
        marginTop: theme.spacing(8)
    }, backdrop: {
        zIndex: theme.zIndex.drawer + 1, color: '#fff'
    }
}));

const PostBook = () => {
    const classes = useStyles();
    const [title, setTitle] = useState(null);
    const [cover, setCover] = useState(null);
    const [tags, setTags] = useState(null);
    const [price, setPrice] = useState(null);
    const [summary, setSummary] = useState(null);
    const author = useAuth();
    const {register, handleSubmit} = useForm();
    const [loading, setLoading] = useState(false);

    const onSubmit = bookData => postBook(bookData);
    const handleTitleChange = (event) => setTitle(event.target.value)
    const handleCoverChange = (event) => setCover(event.target.value)
    const handleTagsChange = (event) => setTags(event.target.value)
    const handlePriceChange = (event) => setPrice(event.target.value)
    const handleSummaryChange = (event) => setSummary(event.target.value)

    function postBook(bookData) {
        setLoading(true);
        new PostBookUseCase(new AuthenticatedUserRepository()).execute({
            title: bookData['title'],
            cover: bookData['cover'],
            price: bookData['price'],
            tags: bookData['tags'].split(" "),
            summary: bookData['summary']
        })
            .then((bookId) => {
                setLoading(false)
                window.location.href = `/my-publications/${bookId}`
            })
            .catch((error) => {
                setLoading(false)
                console.error(error)
            })
    }

    return (<Container component="main" className={classes.mainContainer}>
        <Grid container spacing={5} justify={"center"} direction={"row"}>
            <Grid item className={classes.formContainer} xs={12} sm={6} md={5}>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h4">
                        Write a new book
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="title"
                                    name="title"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="title"
                                    label="Title"
                                    autoFocus
                                    onChange={handleTitleChange}
                                    inputRef={register}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="cover"
                                    name="cover"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="cover"
                                    label="Cover URL"
                                    onChange={handleCoverChange}
                                    inputRef={register}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="tags"
                                    label="Tags"
                                    name="tags"
                                    autoComplete="tags space separated"
                                    onChange={handleTagsChange}
                                    inputRef={register}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="price"
                                    label="Price"
                                    name="price"
                                    autoComplete="price"
                                    required
                                    onChange={handlePriceChange}
                                    inputRef={register}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="summary"
                                    label="Summary"
                                    id="summary"
                                    autoComplete="summary"
                                    multiline={true}
                                    rows={20}
                                    onChange={handleSummaryChange}
                                    inputRef={register}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={loading}
                        >
                            Create
                        </Button>
                    </form>
                </div>
            </Grid>
            <PostBookPreview title={title} cover={cover} tags={tags} summary={summary} price={price} author={author} />
        </Grid>
        <Backdrop className={classes.backdrop} open={loading}>
            <CircularProgress color="inherit"/>
        </Backdrop>
    </Container>);
}

export default PostBook