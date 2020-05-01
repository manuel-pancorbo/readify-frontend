import React, {useEffect, useState} from "react";
import BookListing from "./BookListing";
import {SearchBooksByFilters} from "../../usecases/searchbooksbyfilters/SearchBooksByFilters";

const Home = () => {
    const [searchResults, setSearchResults] = useState({results: [], total: 0});
    useEffect(() => {
        const searchBooks = () => {
            new SearchBooksByFilters().execute(extractFilters())
                .then((searchResponse) => setSearchResults({results: searchResponse.books, total: searchResponse.total}))
                .catch((error) => { console.error(error) })
        };
        searchBooks()
    }, []);

    return (<BookListing books={searchResults.results} total={searchResults.total}/>);

    function extractFilters() {
        const filters = {};
        const urlSearchParams = new URLSearchParams(window.location.search)

        if (urlSearchParams.get("tags") != null) filters["tag"] = urlSearchParams.get("tags")
        if (urlSearchParams.get("search") != null) filters["text"] = urlSearchParams.get("search")
        if (urlSearchParams.get("author") != null) filters["author"] = urlSearchParams.get("author")

        return filters
    }
};

export default Home