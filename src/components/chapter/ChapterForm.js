import {makeStyles} from "@material-ui/core/styles";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ChapterContentField from "./ChapterContentField";

const formStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex', flexDirection: 'column', alignItems: 'center',
    }, form: {
        marginTop: theme.spacing(3), width: '100%', // Fix IE 11 issue.
    }, submit: {
        margin: theme.spacing(3, 0, 2),
    }, excerpt: {
        marginTop: "10px"
    }, submitContainer: {
        margin: "auto"
    }
}));

const ChapterForm = ({action, onSubmit}) => {
    const classes = formStyles();
    const [chapterContent, setChapterContent] = useState(null)
    const handleEditorChange = ({text}) => setChapterContent(text)
    const {register, handleSubmit} = useForm();
    const appendContentToFormData = formData => {
        formData.content = chapterContent
        return formData
    }

    return <form className={classes.form} onSubmit={handleSubmit(formData => onSubmit(appendContentToFormData(formData)))}>
        <Grid container spacing={2}>
            <Grid container direction={"row"} spacing={2}>
                <Grid item xs={2}>
                    <TextField
                        autoComplete="order"
                        name="order"
                        variant="outlined"
                        required
                        fullWidth
                        id="order"
                        label="Order"
                        autoFocus
                        type={"number"}
                        inputRef={register}
                    />
                </Grid>
                <Grid item xs={7}>
                    <TextField
                        autoComplete="title"
                        name="title"
                        variant="outlined"
                        required
                        fullWidth
                        id="title"
                        label="Title"
                        inputRef={register}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        autoComplete="price"
                        name="price"
                        variant="outlined"
                        required
                        fullWidth
                        id="price"
                        label="Price"
                        inputRef={register}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.excerpt}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="excerpt"
                    label="Excerpt"
                    id="excerpt"
                    autoComplete="excerpt"
                    multiline={true}
                    rows={5}
                    inputRef={register}
                />
            </Grid>
            <Grid item xs={12}>
                <ChapterContentField content={chapterContent} onChange={handleEditorChange}/>
            </Grid>
        </Grid>
        <Grid item xs={6} md={3} className={classes.submitContainer}>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Save
            </Button>
        </Grid>
    </form>
}

export default ChapterForm