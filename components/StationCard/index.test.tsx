import React from "react";
import {render, screen} from "@testing-library/react";
import {MockedProvider} from "@apollo/client/testing";
import {FETCH_STATION_QUERY} from "../../queries/fetch";
import StationCard from "./index";
import {act} from "react-dom/test-utils";
import {
    mapBooleanToYesNo,
    parseLocationToString,
    parseMailingAddressToString,
    parseStationManagementToString,
    testStationData
} from "../../utils/Constants";

const mocks = [
    {
        request: {
            query: FETCH_STATION_QUERY,
            variables: {
                evaId: 0,
            },
        },
        result: {
            data: {
                stationWithEvaId: testStationData
            }
        },
    },
];

describe("StationCard", () => {
    test("it renders on the screen", async () => {
        act(() => {
            render(
                <MockedProvider mocks={mocks} addTypename={false}
                                defaultOptions={{watchQuery: {fetchPolicy: 'no-cache'}}}>
                    <StationCard primaryEvaId={0}/>
                </MockedProvider>
            );

        })
        await new Promise(resolve => setTimeout(resolve, 0))
        expect(screen.getByRole("heading", {level: 2})).toBeInTheDocument();
    });

    test("it renders details correctly", async () => {
        act(() => {
            render(
                <MockedProvider mocks={mocks} addTypename={false}
                                defaultOptions={{watchQuery: {fetchPolicy: 'no-cache'}}}>
                    <StationCard primaryEvaId={0}/>
                </MockedProvider>
            );

        })
        await new Promise(resolve => setTimeout(resolve, 0))

        expect(screen.getByRole("heading", {level: 2}).innerHTML).toEqual(testStationData.name);
        expect(screen.getByRole("cell", {name: "station-management-val"}).innerHTML).toEqual(parseStationManagementToString(testStationData.stationManagement));
        expect(screen.getByRole("cell", {name: "mailing-address-val"}).innerHTML).toEqual(parseMailingAddressToString(testStationData.mailingAddress));
        expect(screen.getByRole("cell", {name: "location-val"}).innerHTML).toEqual(parseLocationToString(testStationData.location));
        expect(screen.getByRole("cell", {name: "public-transport-val"}).innerHTML).toEqual(mapBooleanToYesNo(testStationData.hasLocalPublicTransport));
        expect(screen.getByRole("cell", {name: "public-facilities-val"}).innerHTML).toEqual(mapBooleanToYesNo(testStationData.hasPublicFacilities));
        expect(screen.getByRole("cell", {name: "wifi-val"}).innerHTML).toEqual(mapBooleanToYesNo(testStationData.hasWiFi));
    });
});
