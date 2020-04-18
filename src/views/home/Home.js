import React, {useEffect, useState} from "react";
import BookListing from "./BookListing";
import axios from 'axios';
import {stringify} from "querystring";

const Home = () => {
    const [searchResults, setSearchResults] = useState({results: [], total: 0});
    useEffect(() => {
        const callToApi = () => {
            axios.get('/v1/books?' + stringify(extractFilters()))
                .then(function (response) {
                    console.log(response.data);
                    setSearchResults(response.data)
                })
                .catch(function (error) {
                    console.error(error)
                })
        }
        callToApi()
    }, []);

    return (
        <BookListing books={searchResults.results} total={searchResults.total}/>
    );

    function extractFilters() {
        const filters = {};
        const urlSearchParams = new URLSearchParams(window.location.search)

        if (urlSearchParams.get("tag") != null) filters["tag"] = urlSearchParams.get("tag")
        if (urlSearchParams.get("search") != null) filters["text"] = urlSearchParams.get("search")
        if (urlSearchParams.get("author") != null) filters["author"] = urlSearchParams.get("author")

        return filters
    }
};

export default Home