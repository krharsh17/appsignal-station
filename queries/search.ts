import {gql} from "@apollo/client";

export const searchQuery = gql`
    query searchTrains($query: String!) {
        search(searchTerm: $query) {
            stations {
                primaryEvaId
            }
        }
    }
`;