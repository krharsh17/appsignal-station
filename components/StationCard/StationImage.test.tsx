import React from "react";
import {render, screen} from "@testing-library/react";
import StationImage from "./StationImage";
import {placeholderImageURL} from "../../utils/Constants";

describe("StationImage", () => {
    test("it renders an image", () => {
        render(<StationImage imageUrl={"https://www.vincenteverts.nl/wp-content/uploads/2017/07/trainstation.jpg"}/>);
        expect(screen.getByRole("img", {name: "station image"})).toBeInTheDocument();
    });

    test("it renders the correct image", () => {
        const imageUrl = "https://www.vincenteverts.nl/wp-content/uploads/2017/07/trainstation.jpg"
        render(<StationImage imageUrl={imageUrl}/>);

        const image = screen.getByRole("img", {name: "station image"})

        expect(image).toHaveAttribute("src", imageUrl)
    });

    test("it shows placeholder on failure", () => {
        const wrongImageUrl = "https://www.vincenteverts.nl/wp-content/uploads/2017/07/trainstation.jp"

        render(<StationImage imageUrl={wrongImageUrl}/>)

        const image = screen.getByRole("img", {name: "station image"})

        setTimeout(() => {
            expect(image).toHaveAttribute("src", placeholderImageURL)
        }, 5000)
    })
});
