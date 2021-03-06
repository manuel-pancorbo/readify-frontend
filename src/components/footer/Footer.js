import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0, padding: 0, listStyle: 'none',
        },
    }, footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(8),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(6), paddingBottom: theme.spacing(6),
        },
    },
}));

const Footer = () => {
    const footers = [{
        title: 'Compañía', description: ['Equipo', 'Historia', 'Contacta con nosotros', 'Localización'],
    }, {
        title: 'Funcionalidades', description: ['Publica y vende libros', 'Compra Libros', 'Compra capítulos'],
    },  {
        title: 'Legal', description: ['Política de privacidad', 'Términos de uso'],
    }];

    const classes = useStyles();

    return (<Container maxWidth="md" component="footer" className={classes.footer}>
        <Grid container spacing={4} justify="space-evenly">
            {footers.map((footer) => (<Grid item xs={6} sm={3} key={footer.title}>
                <Typography variant="h6" color="textPrimary" gutterBottom>
                    {footer.title}
                </Typography>
                <ul>
                    {footer.description.map((item) => (<li key={item}>
                        <Link href="#" variant="subtitle1" color="textSecondary">
                            {item}
                        </Link>
                    </li>))}
                </ul>
            </Grid>))}
        </Grid>
        <Box mt={5}>
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="https://readify.com/">
                    Readify
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </Box>
    </Container>)
}

export default Footer