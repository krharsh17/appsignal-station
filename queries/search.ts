import {gql} from "@apollo/client";

/**
 * GraphQL query for searching and retrieving a list of primaryEvaIds for given search query
 */
export const SEARCH_STATION_QUERY = gql`
    query searchTrains($query: String!) {
        search(searchTerm: $query) {
            stations {
                primaryEvaId
            }
        }
    }
`;