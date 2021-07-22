export interface CardData {
    name: string
    stationManagement: StationManagement
    hasLocalPublicTransport: boolean
    hasPublicFacilities: boolean
    hasWiFi: boolean
    mailingAddress: MailingAddress
    location: Location
    picture: StationImage | null
}

export interface StationManagement {
    name: string | null
    email: string | null
}

export interface MailingAddress {
    street: string | null
    city: string | null
    zipcode: string | null
}

export interface Location {
    latitude: number
    longitude: number
}

export interface StationImage {
    url: string
}