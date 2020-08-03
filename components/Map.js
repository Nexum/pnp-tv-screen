import {useCallback, useEffect, useRef, useState} from "react";
import useSocket from "../hooks/useSocket";
import FogOfWar from "./FogOfWar";

export default function Map({className, mapName, fow, isGm, resetFow, saveFogOfWar}) {
    const [imageLoadTimestamp, setImageLoad] = useState();
    const [imageWidth, setImageWidth] = useState();
    const [imageHeight, setImageHeight] = useState();
    const mapRef = useRef();
    const containerRef = useRef();

    useSocket(`file.${mapName}.changed`, () => {
        setImageLoad(Date.now());
    });

    function handleMapLoad(e) {
        containerRef.current.style.width = "auto";
        setImageWidth(mapRef.current.clientWidth);
        setImageHeight(mapRef.current.clientHeight);
    }

    return (
        <div className={(className || "") + " map"} ref={containerRef}>
            <FogOfWar data={fow} resetFow={resetFow} width={imageWidth} height={imageHeight} isGm={isGm} onSave={saveFogOfWar}/>
            <img ref={mapRef} onLoad={handleMapLoad} src={`/api/file/${mapName}/png?loadTimestamp=${imageLoadTimestamp}`}/>
        </div>
    );
}