import {
    mapBooleanToYesNo,
    parseLocationToString,
    parseMailingAddressToString,
    parseStationManagementToString
} from "./Constants";

describe("Operations", () => {
    test("boolean map works correctly", () => {
        expect(mapBooleanToYesNo(true)).toEqual("Yes")

        expect(mapBooleanToYesNo(false)).toEqual("No")
    });

    test("station management map works correctly", () => {
        expect(parseStationManagementToString({name: "Ryan Black", email: 'rb@email.com'}))
            .toEqual("Ryan Black (rb@email.com)")

        expect(parseStationManagementToString({name: "Ryan Black", email: null}))
            .toEqual("Ryan Black")

        expect(parseStationManagementToString({name: null, email: 'rb@email.com'}))
            .toEqual("rb@email.com")

        expect(parseStationManagementToString({name: null, email: null}))
            .toEqual("")
    })

    test("mailing address map works correctly", () => {
        expect(parseMailingAddressToString({street: "5th Avenue", zipcode: "80034", city: "Birmingham"}))
            .toEqual("5th Avenue, Birmingham (80034)")

        expect(parseMailingAddressToString({street: "5th Avenue", zipcode: null, city: "Birmingham"}))
            .toEqual("5th Avenue, Birmingham")

        expect(parseMailingAddressToString({street: "5th Avenue", zipcode: "80034", city: null}))
            .toEqual("5th Avenue (80034)")

        expect(parseMailingAddressToString({street: "5th Avenue", zipcode: null, city: null}))
            .toEqual("5th Avenue")

        expect(parseMailingAddressToString({street: null, zipcode: "80034", city: "Birmingham"}))
            .toEqual("Birmingham (80034)")

        expect(parseMailingAddressToString({street: null, zipcode: null, city: "Birmingham"}))
            .toEqual("Birmingham")

        expect(parseMailingAddressToString({street: null, zipcode: "80034", city: null}))
            .toEqual("80034")

        expect(parseMailingAddressToString({street: null, zipcode: null, city: null}))
            .toEqual("")
    })

    test("location map works correctly", () => {
        expect(parseLocationToString({latitude: 40, longitude: 40}))
            .toEqual("40°N 40°E")

        expect(parseLocationToString({latitude: 40, longitude: -40}))
            .toEqual("40°N 40°W")

        expect(parseLocationToString({latitude: -40, longitude: -40}))
            .toEqual("40°S 40°W")

        expect(parseLocationToString({latitude: -40, longitude: 40}))
            .toEqual("40°S 40°E")

        expect(parseLocationToString({latitude: 0, longitude: 0}))
            .toEqual("0°N 0°E")

    })

});
