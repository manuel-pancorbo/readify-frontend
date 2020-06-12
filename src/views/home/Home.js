import React, {useEffect, useState} from "react";
import BookListing from "./BookListing";
import {SearchBooksByFilters} from "../../usecases/searchbooksbyfilters/SearchBooksByFilters";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(() => ({
    rootGrid: {
        flexGrow: 1, marginTop: 50 + "px"
    }
}));

const Home = () => {
    const classes = useStyles();
    const [searchResults, setSearchResults] = useState({results: [], total: 0});
    useEffect(() => {
        const searchBooks = () => {
            new SearchBooksByFilters().execute(extractFilters())
                .then((searchResponse) => setSearchResults({results: searchResponse.books, total: searchResponse.total}))
                .catch((error) => {
                    console.error(error)
                })
        };
        searchBooks()
    }, []);

    return (<Container maxWidth={"lg"} component="footer" className={classes.footer}>
        <Grid container className={classes.rootGrid} spacing={5}>
            <Grid item xs={12}><Typography variant={"h5"} component={"h1"}>{searchSummary(extractFilters(), searchResults.total)}</Typography></Grid>
            <BookListing books={searchResults.results} total={searchResults.total}/>
        </Grid>
    </Container>);

    function extractFilters() {
        const filters = {};
        const urlSearchParams = new URLSearchParams(window.location.search)

        if (urlSearchParams.get("tags") != null) filters["tag"] = urlSearchParams.get("tags")
        if (urlSearchParams.get("search") != null) filters["text"] = urlSearchParams.get("search")
        if (urlSearchParams.get("author") != null) filters["author"] = urlSearchParams.get("author")

        return filters
    }

    function searchSummary(filters, total) {
        let summary = total + " resultados encontrados"

        if (total === 1) {
            summary = "1 resultado encontrado"
        }

        if (filters.hasOwnProperty('text')) {
            summary += " buscando por: " + filters.text
        }

        return summary
    }
};

export default Home