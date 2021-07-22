import React from "react";
import StationImage from "./StationImage";
import {
    EMPTY_STRING,
    mapBooleanToYesNo,
    mapLocationToString,
    mapMailingAddressToString,
    mapStationManagementToString
} from "../Constants";
import {useQuery} from "@apollo/client";
import {fetchStationQuery} from "../../queries/fetch";
import Loader from "../Loader";

const Index = (props: StationCardPropTypes) => {

    const {data, error, loading} = useQuery(fetchStationQuery, {variables: {evaId: props.primaryEvaId}});

    if (loading) return <Loader/>
    if (error) return <div/>

    const stationData = data.stationWithEvaId

    return <li className="flex relative gap-4 p-4 shadow rounded-lg border-gray-200 bg-white">
        <StationImage imageUrl={stationData.picture?.url || EMPTY_STRING}/>
        <div>
            <h2 className="text-2xl font-medium text-gray-800 mb-2">{stationData.name}</h2>

            <table className="border-t w-full table-fixed">
                <tr>
                    <th className="font-medium pr-4 py-1 border-b">{"Station Management"}</th>
                    <td className="py-1 border-b" aria-label={"station-management-val"}>
                        {mapStationManagementToString(stationData.stationManagement)}
                    </td>
                </tr>

                <tr>
                    <th className="font-medium pr-4 py-1 border-b">{"Mailing Address"}</th>
                    <td className="py-1 border-b" aria-label={"mailing-address-val"}>
                        {mapMailingAddressToString(stationData.mailingAddress)}
                    </td>
                </tr>

                <tr>
                    <th className="font-medium pr-4 py-1 border-b">{"Location"}</th>
                    <td className="py-1 border-b" aria-label={"location-val"}>
                        {mapLocationToString(stationData.location)}
                    </td>
                </tr>

                <tr>
                    <th className="font-medium pr-4 py-1 border-b">{"Local Public Transport Available?"}</th>
                    <td className="py-1 border-b" aria-label={"public-transport-val"}>
                        {mapBooleanToYesNo(stationData.hasLocalPublicTransport)}
                    </td>
                </tr>

                <tr>
                    <th className="font-medium pr-4 py-1 border-b">{"Public Facilities Available?"}</th>
                    <td className="py-1 border-b" aria-label={"public-facilities-val"}>
                        {mapBooleanToYesNo(stationData.hasPublicFacilities)}
                    </td>
                </tr>

                <tr>
                    <th className="font-medium pr-4 py-1 border-b">{"Wifi Available?"}</th>
                    <td className="py-1 border-b" aria-label={"wifi-val"}>
                        {mapBooleanToYesNo(stationData.hasWiFi)}
                    </td>
                </tr>

            </table>
        </div>
    </li>
};


interface StationCardPropTypes {
    primaryEvaId: number
}


export default Index