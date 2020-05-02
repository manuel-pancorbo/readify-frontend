import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useForm} from 'react-hook-form'
import Alert from "@material-ui/lab/Alert";
import {LoginUseCase} from "../../usecases/login/LoginUseCase";
import {AuthenticatedUserRepository} from "../../services/auth/AuthenticatedUserRepository";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8), display: 'flex', flexDirection: 'column', alignItems: 'center',
    }, avatar: {
        margin: theme.spacing(1), backgroundColor: theme.palette.secondary.main,
    }, form: {
        width: '100%', marginTop: theme.spacing(1),
    }, submit: {
        margin: theme.spacing(3, 0, 2),
    }, errorMessage: {
        marginTop: '20px'
    }
}));

const Login = () => {
    const classes = useStyles();
    const {register, handleSubmit} = useForm();
    const [submitError, setSubmitError] = useState(false);
    const [loading, setLoading] = useState(false);
    const onSubmit = loginData => {
        logInUser(loginData)
    };

    function logInUser(loginData) {
        setLoading(true);
        new LoginUseCase(new AuthenticatedUserRepository()).execute(loginData['userIdentifier'], loginData['password'])
            .then(() => {
                setLoading(false);
                window.location.href = redirectAfterLogin()
            })
            .catch(() => {
                setLoading(false);
                setSubmitError(true)
            })
    }

    const redirectAfterLogin = () => {
        const urlSearchParams = new URLSearchParams(window.location.search)

        return urlSearchParams.get("redirectTo") != null ? urlSearchParams.get("redirectTo") : "/profile";
    }

    let errorMessage;
    if (submitError) {
        errorMessage =
            <Alert className={classes.errorMessage} severity="error">Ups, seems that your credentials are not valid, please check them
                out.</Alert>;
    }

    return (<Container component="main" maxWidth="xs">
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
                Login
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="userIdentifier"
                    label="Email or Username"
                    name="userIdentifier"
                    autoComplete="Email or Username"
                    autoFocus
                    inputRef={register}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    inputRef={register}
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary"/>}
                    label="Remember me"
                    name="rememberme"
                    inputRef={register}
                />
                {errorMessage}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    className={classes.submit}
                >
                    Log In
                </Button>
                <Grid container>
                    <Grid item>
                        <Link href="/sign-up" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </div>
    </Container>);
};

export default Login