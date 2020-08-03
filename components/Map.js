import {useCallback, useRef, useState} from "react";
import {Stage, Layer, Image} from 'react-konva';
import useSocket from "../hooks/useSocket";

export default function Map({className, isGm, onLoad}) {
    const [imageLoadTimestamp, setImageLoad] = useState();
    const [imageWidth, setImageWidth] = useState();
    const mapRef = useRef();
    const containerRef = useRef();

    useSocket("file.map.changed", () => {
        setImageLoad(Date.now());
    });

    function handleMapLoad(e) {
        if (onLoad) {
            setImageWidth(mapRef.current.clientWidth);
            onLoad(mapRef.current.clientWidth);
        }
    }

    return (
        <div className={(className || "") + " map d-flex align-content-center justify-content-center"} ref={containerRef} style={{width: imageWidth}}>
            <div className="background-image">
                <img ref={mapRef} onLoad={handleMapLoad} src={"/api/file/map/png?loadTimestamp=" + imageLoadTimestamp}/>
            </div>
        </div>
    );
}