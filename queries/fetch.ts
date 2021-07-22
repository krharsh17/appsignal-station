import {gql} from "@apollo/client";

/**
 * GraphQL query for fetching a station's details from the API
 */
export const FETCH_STATION_QUERY = gql`
    query fetchStation($evaId: Int!) {
        stationWithEvaId(evaId: $evaId) {
            name
            stationManagement {
                name
                email
            }
            hasLocalPublicTransport
            hasPublicFacilities
            hasWiFi
            mailingAddress {
                street
                city
                zipcode
            }
            location {
                latitude
                longitude
            }
            picture {
                url
            }
        }
    }
`;
