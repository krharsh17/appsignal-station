import {useLazyQuery} from "@apollo/client";
import {SEARCH_STATION_QUERY} from "../queries/search";
import React, {useEffect, useState} from "react";
import Loader from "../components/Loader";
import StationCard from "../components/StationCard";
import {EMPTY_STRING} from "../utils/Constants";
import {useRouter} from "next/router";

/**
 * The root component for the application
 * Responsible for searching and rendering the list of results
 */
function Home() {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState("");

    // Lazy query declaration to be invoked when search button is clicked
    const [runQuery, {loading, error, data}] = useLazyQuery(SEARCH_STATION_QUERY);

    // Updates the searchQuery state object as the user types
    const onQueryChange = ev => {
        setSearchQuery(ev.target.value)
    }

    // Appends the search query to the browser router
    const onSearchClicked = () => {
        router.push('/?query=' + searchQuery, undefined, {shallow: true})
    }

    // Updates the state with the latest search query from the browser route and initiates search
    useEffect(() => {
        let newSearchQuery: string = EMPTY_STRING
        if (typeof router.query.query === "string")
            newSearchQuery = router.query.query
        else if (router.query.query instanceof Array)
            newSearchQuery = router.query.query[0]

        // If the page is loaded directly from a URL, this line aligns the searchQuery state with the route parameter
        setSearchQuery(newSearchQuery)

        // Runs the search operation
        if (newSearchQuery !== EMPTY_STRING)
            runQuery({
                variables: {query: newSearchQuery}
            })
    }, [router.query])

    return <>
        <div className="min-h-screen bg-gray-100 flex justify-center">
            <div className="max-w-3xl w-full mt-10 space-y-8">
                <h1 className="text-4xl font-medium">🚂 Choo choo, AppSignal Station</h1>

                <form className="flex gap-4">
                    <input type="search"
                           value={searchQuery}
                           onChange={onQueryChange}
                           className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full border-gray-300 rounded-md p-4 text-lg"
                           placeholder="Station name" autoFocus/>
                    <button
                        type={'button'}
                        className="shadow-sm bg-blue-600 text-white rounded-md p-4 text-lg whitespace-nowrap"
                        onClick={onSearchClicked}
                    >Find my station
                    </button>
                </form>

                {/* Show the loader when the results are not processed */}
                {loading ? <Loader/> : <div/>}

                {/* If no results are found, show a banner */}
                {!loading && data && data.search?.stations.length === 0 ?
                    <p className="bg-gray-200 rounded-lg p-4">No stations found :(</p>
                    : <div/>}

                {/* If results are found, render a list of station cards corresponding to the search results */}
                {data && !loading ?
                    <ul className="space-y-8">
                        {data?.search?.stations.map((station, index) => <StationCard key={index} primaryEvaId={station.primaryEvaId}/>)}
                    </ul>
                    : <div/>}

                {/* If the API returns an error in response, display it to the user */}
                {!data && error ?
                    <p className="bg-gray-200 rounded-lg p-4">{`Error: ${error}`}</p>
                    : <div/>}
            </div>
        </div>
    </>
}

export default Home
