import {makeStyles} from "@material-ui/core/styles";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ChapterContentField from "./ChapterContentField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Tooltip from "@material-ui/core/Tooltip";
import Switch from "@material-ui/core/Switch";

const formStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex', flexDirection: 'column', alignItems: 'center',
    }, form: {
        marginTop: theme.spacing(6), width: '100%', // Fix IE 11 issue.
    }, submit: {
        margin: theme.spacing(3, 0, 2),
    }, excerpt: {
        marginTop: "10px"
    }, submitContainer: {
        margin: "auto"
    }
}));

const ChapterForm = ({chapter, action, onSubmit}) => {
    const classes = formStyles();
    const [chapterContent, setChapterContent] = useState(null)
    const [isStatusChecked, setStatusChecked] = useState(false)
    const {register, handleSubmit, getValues} = useForm();
    const appendContentToFormData = formData => {
        formData.content = chapterContent

        if (formData.status) {
            formData.status = "published"
        } else {
            formData.status = "draft"
        }

        return formData
    }
    const isEditAction = () => action === "edit"
    const handleStatusChange = () => setStatusChecked(getValues().status)

    return <form className={classes.form} onSubmit={handleSubmit(formData => onSubmit(appendContentToFormData(formData)))}>
        <Grid container spacing={2}>
            <Grid container direction={"row"} spacing={2}>
                {action === "edit" && <Grid item xs={12}>
                    <FormControlLabel
                        control={<Tooltip placement="top-start" title="Once published, a chapter cannot be unpublished">
                            <Switch color="primary" checked={isStatusChecked} inputRef={register} inputProps={{ name: "status", onChange: handleStatusChange}}/>
                        </Tooltip>}
                        label={isStatusChecked ? "Published" : "Draft"}
                    />
                </Grid>}
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
                        value={chapter ? chapter.order : ""}
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
                        value={chapter ? chapter.title : ""}
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
                        value={chapter ? chapter.price : ""}
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
                    value={chapter ? chapter.excerpt : ""}
                />
            </Grid>
            <Grid item xs={12}>
                <ChapterContentField content={(isEditAction() && !chapterContent && chapter) ? chapter.content : chapterContent} onChange={({text}) => setChapterContent(text)}/>
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