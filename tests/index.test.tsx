import {render, screen} from "@testing-library/react";
import App from "../pages";
import {FETCH_STATION_QUERY} from "../queries/fetch";
import {testStationData} from "../utils/Constants";
import {MockedProvider} from "@apollo/client/testing";
import React from "react";
import {SEARCH_STATION_QUERY} from "../queries/search";

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

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
    {
        request: {
            query: SEARCH_STATION_QUERY,
            variables: {
                query: "query",
            },
        },
        result: {
            data: {
                stations: [
                    {
                        primaryEvaId: 8000082
                    },
                    {
                        primaryEvaId: 8010109
                    },
                    {
                        primaryEvaId: 8004168
                    },
                    {
                        primaryEvaId: 8004167
                    }
                ]
            }
        },
    }
];


describe("App", () => {
    it("renders without crashing", () => {
        useRouter.mockImplementationOnce(() => ({
            query: {},
        }))
        render(
            <MockedProvider mocks={mocks} addTypename={false}
                            defaultOptions={{watchQuery: {fetchPolicy: 'no-cache'}}}>
                    <App/>
            </MockedProvider>
        );
        expect(
            screen.getByText("🚂 Choo choo, AppSignal Station")
        ).toBeInTheDocument();
    });
});
