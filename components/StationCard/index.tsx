import React from "react";
import StationImage from "./StationImage";
import {
    EMPTY_STRING,
    mapBooleanToYesNo,
    parseLocationToString,
    parseMailingAddressToString,
    parseStationManagementToString,
    STATION_LOCATION_TITLE,
    STATION_MAILING_ADDRESS_TITLE,
    STATION_MANAGEMENT_TITLE,
    STATION_PUBLIC_FACILITIES_TITLE,
    STATION_PUBLIC_TRANSPORT_TITLE,
    STATION_WIFI_TITLE
} from "../../utils/Constants";
import {useQuery} from "@apollo/client";
import {FETCH_STATION_QUERY} from "../../queries/fetch";
import Loader from "../Loader";

/**
 * Card component to show station details
 * @param primaryEvaId      The evaId of the station whose details have to be shown
 */
const Index = ({primaryEvaId}: StationCardPropTypes) => {

    // Fetch the details of the station whose evaId has been provided
    const {data, error, loading} = useQuery(FETCH_STATION_QUERY, {variables: {evaId: primaryEvaId}});

    // While loading, show the Loader component
    if (loading) return <Loader/>

    // If an error is encountered, print to log and hide the component
    if (error) {
        console.log("Error: ", error)
        return <div/>
    }

    const stationData = data.stationWithEvaId

    return <li className="flex relative gap-4 p-4 shadow rounded-lg border-gray-200 bg-white">
        <StationImage imageUrl={stationData.picture?.url || EMPTY_STRING}/>
        <div>

            {/* Station Name */}
            <h2 className="text-2xl font-medium text-gray-800 mb-2">{stationData.name}</h2>

            {/* Station Details */}
            <table className="border-t w-full table-fixed">

                {/* Station Management Details */}
                <tr>
                    <th className="font-medium pr-4 py-1 border-b">{STATION_MANAGEMENT_TITLE}</th>
                    <td className="py-1 border-b" aria-label={"station-management-val"}>
                        {parseStationManagementToString(stationData.stationManagement)}
                    </td>
                </tr>

                {/* Station Mailing Address */}
                <tr>
                    <th className="font-medium pr-4 py-1 border-b">{STATION_MAILING_ADDRESS_TITLE}</th>
                    <td className="py-1 border-b" aria-label={"mailing-address-val"}>
                        {parseMailingAddressToString(stationData.mailingAddress)}
                    </td>
                </tr>

                {/* Station Location */}
                <tr>
                    <th className="font-medium pr-4 py-1 border-b">{STATION_LOCATION_TITLE}</th>
                    <td className="py-1 border-b" aria-label={"location-val"}>
                        {parseLocationToString(stationData.location)}
                    </td>
                </tr>

                {/* Station Public Transport Availability*/}
                <tr>
                    <th className="font-medium pr-4 py-1 border-b">{STATION_PUBLIC_TRANSPORT_TITLE}</th>
                    <td className="py-1 border-b" aria-label={"public-transport-val"}>
                        {mapBooleanToYesNo(stationData.hasLocalPublicTransport)}
                    </td>
                </tr>

                {/* Station Public Facilities Availability */}
                <tr>
                    <th className="font-medium pr-4 py-1 border-b">{STATION_PUBLIC_FACILITIES_TITLE}</th>
                    <td className="py-1 border-b" aria-label={"public-facilities-val"}>
                        {mapBooleanToYesNo(stationData.hasPublicFacilities)}
                    </td>
                </tr>

                {/* Station Wifi Availability */}
                <tr>
                    <th className="font-medium pr-4 py-1 border-b">{STATION_WIFI_TITLE}</th>
                    <td className="py-1 border-b" aria-label={"wifi-val"}>
                        {mapBooleanToYesNo(stationData.hasWiFi)}
                    </td>
                </tr>

            </table>
        </div>
    </li>
};

/**
 * PropType for the Station Card Component
 */
interface StationCardPropTypes {
    primaryEvaId: number
}


export default Index