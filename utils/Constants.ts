import {Location, MailingAddress, StationData, StationManagement} from "./Types";

export const placeholderImageURL = "https://via.placeholder.com/720x720?text=No+Image+Available"
export const STATION_MANAGEMENT_TITLE = "Station Management"
export const STATION_MAILING_ADDRESS_TITLE = "Mailing Address"
export const STATION_LOCATION_TITLE = "Location"
export const STATION_PUBLIC_TRANSPORT_TITLE = "Local Public Transport Available?"
export const STATION_PUBLIC_FACILITIES_TITLE = "Public Facilities Available?"
export const STATION_WIFI_TITLE = "Wifi Available?"

export const EMPTY_STRING = ""

export const testStationData: StationData = {
    name: "Frankfurt (Main) Hbf",
    stationManagement: {
        name: "Frankfurt a. M.",
        email: null,
    },
    hasLocalPublicTransport: true,
    hasPublicFacilities: true,
    hasWiFi: true,
    mailingAddress: {
        street: "Im Hauptbahnhof",
        city: "Frankfurt am Main",
        zipcode: "60329"
    },
    location: {
        latitude: 50.107145,
        longitude: 8.663789
    },
    picture: {
        url: "https://www.vincenteverts.nl/wp-content/uploads/2017/07/trainstation.jp"
    }
}

/**
 * Maps a boolean value to "Yes" or "No"
 * @param val       boolean value
 */
export const mapBooleanToYesNo = (val: boolean) => val ? "Yes" : "No"

/**
 * Parse the raw station management object from the API response into a formatted string
 * @param data      raw station management object
 */
export const parseStationManagementToString = (data: StationManagement) => {
    let result = EMPTY_STRING

    if (data.name)
        result = result.concat(data.name)

    if (data.email)
        result = result.concat(data.name ? ` (${data.email})` : data.email)

    return result
}

/**
 * Parses the raw mailing address object from the API response into a formatted string
 * @param data      raw mailing address object
 */
export const parseMailingAddressToString = (data: MailingAddress) => {
    let result = EMPTY_STRING

    if (data.street)
        result = result.concat(data.street)

    if (data.city)
        result = result.concat(data.street ? `, ${data.city}` : data.city)

    if (data.zipcode)
        result = result.concat(data.street || data.city ? ` (${data.zipcode})` : data.zipcode)

    return result
}

/**
 * Parses the raw location object from the API response into a formatted string
 * @param data      raw location object
 */
export const parseLocationToString = (data: Location) => {
    let result = EMPTY_STRING

    result = result.concat(`${Math.abs(data.latitude)}°${data.latitude >= 0 ? 'N' : 'S'}`)
    result = result.concat(` ${Math.abs(data.longitude)}°${data.longitude >= 0 ? 'E' : 'W'}`)

    return result
}