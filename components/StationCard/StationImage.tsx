import React, {useState} from "react";
import {placeholderImageURL} from "../Constants";
import PropTypes from "prop-types";

const StationImage = (props) => {
    const [imageUrl, setImageUrl] = useState(props.imageUrl || placeholderImageURL)
    const onImageError = () => {
        setImageUrl(placeholderImageURL)
    }
    return <img src={imageUrl}
                onError={onImageError}
                style={{
                    objectFit: "cover",
                    objectPosition: "center"
                }}
                alt={'Station Image'}
                aria-label={"station image"}
                className="w-40 rounded"/>
}

StationImage.propTypes = {
    imageUrl: PropTypes.string
}

export default StationImage