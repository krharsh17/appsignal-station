import {useLazyQuery} from "@apollo/client";
import {searchQuery} from "../queries/search";
import React, {useEffect, useState} from "react";
import Loader from "../components/Loader";
import StationCard from "../components/StationCard";
import {EMPTY_STRING} from "../components/Constants";
import {useRouter} from "next/router";

export default function Home() {
    const router = useRouter()
    const [query, setQuery] = useState("");

    const [runQuery, {loading, error, data}] = useLazyQuery(searchQuery);

    useEffect(() => {
        let searchQuery: string = EMPTY_STRING
        if (typeof router.query.query === "string")
            searchQuery = router.query.query
        else if (router.query.query instanceof Array)
            searchQuery = router.query.query[0]

        setQuery(searchQuery)

        if (searchQuery !== EMPTY_STRING)
            runQuery({
                variables: {query: searchQuery}
            })
    }, [router.query])

    const onSearchClicked = () => {
        router.push('/?query=' + query, undefined, {shallow: true})
    }

    const onQueryChange = ev => {
        setQuery(ev.target.value)
    }

    return <>
        <div className="min-h-screen bg-gray-100 flex justify-center">
            <div className="max-w-3xl w-full mt-10 space-y-8">
                <h1 className="text-4xl font-medium">🚂 Choo choo, AppSignal Station</h1>

                <form className="flex gap-4">
                    <input type="search"
                           value={query}
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

                {loading ? <Loader/> : <div/>}

                {!loading && data && data.search?.stations.length === 0 ?
                    <p className="bg-gray-200 rounded-lg p-4">No stations found :(</p>
                    : <div/>}

                {data && !loading ?
                    <ul className="space-y-8">
                        {data?.search?.stations.map(station => <StationCard primaryEvaId={station.primaryEvaId}/>)}
                    </ul>
                    : <div/>}
                {!data && error ?
                    <p className="bg-gray-200 rounded-lg p-4">{`Error: ${error}`}</p>
                    : <div/>}
            </div>
        </div>

    </>

}

