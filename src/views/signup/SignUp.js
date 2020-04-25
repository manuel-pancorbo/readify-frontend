import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useForm} from 'react-hook-form'
import Alert from "@material-ui/lab/Alert";
import {SignUpUseCase} from "../../usecases/signup/SignUpUseCase";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8), display: 'flex', flexDirection: 'column', alignItems: 'center',
    }, avatar: {
        margin: theme.spacing(1), backgroundColor: theme.palette.secondary.main, width: 100 + "px", height: 100 + "px"
    }, form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    }, submit: {
        margin: theme.spacing(3, 0, 2),
    }, errorMessage: {
        marginTop: '20px'
    }
}));

export default function SignUp() {
    const classes = useStyles();
    const {register, handleSubmit} = useForm();
    const [avatar, setAvatar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState(false);
    const onSubmit = signUpData => signUpUser(signUpData);

    function avatarChanged(event) {
        setAvatar(event.target.value)
    }

    function signUpUser(signUpData) {
        setLoading(true);
        new SignUpUseCase().execute({
            fullName: signUpData['fullName'],
            email: signUpData['email'],
            password: signUpData['password'],
            image: signUpData['avatar'],
            username: signUpData['username']
        })
            .then(function () {
                setLoading(false);
                window.location.href = "/sign-up/success"
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
                setSubmitError(true)
            })
    }

    let errorMessage;
    if (submitError) {
        errorMessage =
            <Alert className={classes.errorMessage} severity="error">Ups, seems that we already have an user registered with that username
                or email </Alert>;
    } else {
        errorMessage = '';
    }

    return (<Container component="main" maxWidth="xs">
        <div className={classes.paper}>
            <SignUpAvatar avatar={avatar}/>
            <Typography component="h1" variant="h5">
                Sign up
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="fullname"
                            name="fullName"
                            variant="outlined"
                            required
                            fullWidth
                            id="fullName"
                            label="Full Name"
                            autoFocus
                            inputRef={register}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="username"
                            name="username"
                            variant="outlined"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            inputRef={register}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            type={"email"}
                            inputRef={register}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            id="avatar"
                            label="Avatar"
                            name="avatar"
                            autoComplete="avatar"
                            onChange={avatarChanged}
                            inputRef={register}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            inputRef={register}
                        />
                    </Grid>
                </Grid>
                {errorMessage}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    className={classes.submit}
                >
                    Sign Up
                </Button>
                <Grid container justify="flex-end">
                    <Grid item>
                        <Link href="/login" variant="body2">
                            Already have an account? Log in
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </div>
    </Container>);
}

const SignUpAvatar = ({avatar}) => {
    const classes = useStyles();

    if (avatar === null) {
        return (<Avatar className={classes.avatar}>
            <LockOutlinedIcon/>
        </Avatar>)
    }

    return (<Avatar className={classes.avatar} src={avatar}/>)
};