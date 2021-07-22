/**
 * Parent type for the station data object
 */
export interface StationData {
    name: string
    stationManagement: StationManagement
    hasLocalPublicTransport: boolean
    hasPublicFacilities: boolean
    hasWiFi: boolean
    mailingAddress: MailingAddress
    location: Location
    picture: StationImage | null
}

/**
 * Type for raw station management details
 */
export interface StationManagement {
    name: string | null
    email: string | null
}

/**
 * type for raw station mailing address details
 */
export interface MailingAddress {
    street: string | null
    city: string | null
    zipcode: string | null
}

/**
 * type for raw station location details
 */
export interface Location {
    latitude: number
    longitude: number
}

/**
 * type for raw station image details
 */
export interface StationImage {
    url: string
}