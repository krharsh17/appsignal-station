import React from "react";
import {render, screen} from "@testing-library/react";

import Loader from "./index";

describe("Loader", () => {
    test("it renders without an error", () => {
        render(<Loader/>);
        expect(screen.getByText("Loading..")).toBeInTheDocument();
    });
});
