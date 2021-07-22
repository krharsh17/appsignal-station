import React, {useState} from "react";
import {placeholderImageURL} from "../../utils/Constants";

/**
 * Image component for the station card
 * Falls back to a placeholder iamge when the given URL throws error
 * @param imageUrl      The image URL supplied by the API for the station
 */
const StationImage = ({imageUrl}: StationImagePropTypes) => {

    // Maintains the URL for the image component
    const [localImageUrl, setLocalImageUrl] = useState(imageUrl || placeholderImageURL)

    // Image onError handler to replace the given image URL with a placeholder URL in case of failure
    const onImageError = () => {
        setLocalImageUrl(placeholderImageURL)
    }

    return <img src={localImageUrl}
                onError={onImageError}
                style={{
                    objectFit: "cover",
                    objectPosition: "center"
                }}
                alt={'Station Image'}
                aria-label={"station image"}
                className="w-40 rounded"/>
}

/**
 * Prop Types for the Station Image component
 * Holds the image URL from the fetch API response
 */
interface StationImagePropTypes {
    imageUrl: string
}

export default StationImage