import {gql} from "@apollo/client";

export const fetchStationQuery = gql`
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
