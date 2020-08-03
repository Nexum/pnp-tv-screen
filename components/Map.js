import {useCallback, useRef, useState} from "react";
import {Stage, Layer, Image} from 'react-konva';
import useSocket from "../hooks/useSocket";

export default function Map({className, mapName}) {
    const [imageLoadTimestamp, setImageLoad] = useState();
    const [imageWidth, setImageWidth] = useState();
    const mapRef = useRef();
    const containerRef = useRef();

    useSocket(`file.${mapName}.changed`, () => {
        setImageLoad(Date.now());
    });

    function handleMapLoad(e) {
        containerRef.current.style.width = "auto";
        setImageWidth(mapRef.current.clientWidth);
    }

    return (
        <div className={(className || "") + " map d-flex align-content-center justify-content-center"} ref={containerRef} style={{width: imageWidth}}>
            <div className="background-image">
                <img ref={mapRef} onLoad={handleMapLoad} src={`/api/file/${mapName}/png?loadTimestamp=${imageLoadTimestamp}`}/>
            </div>
        </div>
    );
}