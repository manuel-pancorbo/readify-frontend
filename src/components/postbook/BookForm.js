import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {useForm} from "react-hook-form";
import {makeStyles} from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Tooltip from "@material-ui/core/Tooltip";

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
    }, completionPercentageSlider: {
        marginTop: "30px"
    }
}));

const BookForm = ({book, onBookChange, onSubmit, action}) => {
    const classes = useStyles();
    const {register, handleSubmit, getValues} = useForm();

    const handleInputChange = () => onBookChange(normalizeFormData(getValues()))
    const isBookVisible = () => book.visibility === "visible"

    const normalizeFormData = (formData) => {
        if (formData.title === "") {
            delete formData.title
        }
        if (formData.cover === "") {
            delete formData.cover
        }
        if (formData.price === "") {
            delete formData.price
        }
        if (formData.summary === "") {
            delete formData.summary
        }
        if (formData.tags === "") {
            delete formData.tags
        } else {
            formData.tags = formData.tags.split(" ")
        }

        if (formData.visibility) {
            formData.visibility = "visible"
        } else {
            formData.visibility = "null"
        }

        if (isNaN(parseInt(formData.completionPercentage))) {
            formData.completionPercentage = 0
        } else {
            formData.completionPercentage = parseInt(formData.completionPercentage)
        }

        formData.completionPercentage = parseInt(formData.completionPercentage)

        return formData
    }

    return <form className={classes.form}
                 onSubmit={handleSubmit((formData) => onSubmit(normalizeFormData(formData)))}>
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
                    onChange={handleInputChange}
                    inputRef={register}
                    value={book ? book.title : ""}
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
                    onChange={handleInputChange}
                    inputRef={register}
                    value={book ? book.cover : ""}
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
                    onChange={handleInputChange}
                    inputRef={register}
                    value={(book && book.tags) ? book.tags.join(" ") : ""}
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
                    onChange={handleInputChange}
                    inputRef={register}
                    value={book ? book.price : ""}
                />
            </Grid>
            {action === "edit" && <Grid item xs={12}>
                <TextField
                    autoComplete="Completion percentage"
                    name="completionPercentage"
                    variant="outlined"
                    required
                    fullWidth
                    type={"number"}
                    inputProps={{min: 0, max: 100}}
                    id="completionPercentage"
                    label="Completion Percentage"
                    onChange={handleInputChange}
                    inputRef={register}
                    value={book ? book.completionPercentage : 0}
                />
            </Grid>}
            {action === "edit" && <Grid item xs={12}>
                <FormControlLabel
                    control={<Tooltip placement="top-start" title="Once published, a book cannot be unpublished"><Switch color="primary"
                                                                                                                         checked={isBookVisible()}
                                                                                                                         inputRef={register}
                                                                                                                         inputProps={{
                                                                                                                             onChange: handleInputChange,
                                                                                                                             name: "visibility"
                                                                                                                         }}/></Tooltip>}
                    label="visibility"
                />
            </Grid>}
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
                    onChange={handleInputChange}
                    inputRef={register}
                    value={book ? book.summary : ""}
                />
            </Grid>
        </Grid>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
        >
            Save
        </Button>
    </form>
}

export default BookForm