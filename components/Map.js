import {useCallback, useEffect, useRef, useState} from "react";
import useSocket from "../hooks/useSocket";
import FogOfWar from "./FogOfWar";

export default function Map({className, mapName, marker, fow, isGm, resetFow, saveFogOfWar}) {
    const [imageLoadTimestamp, setImageLoad] = useState();
    const [imageWidth, setImageWidth] = useState();
    const [imageHeight, setImageHeight] = useState();
    const containerRef = useRef();

    useSocket(`file.${mapName}.changed`, () => {
        setImageLoad(Date.now());
    });

    function handleMapLoad(width, height) {
        containerRef.current.style.width = "auto";
        setImageWidth(width);
        setImageHeight(height);
    }

    return (
        <div className={(className || "") + " map"} ref={containerRef}>
            <FogOfWar data={fow} mapSrc={`/api/file/${mapName}/png?loadTimestamp=${imageLoadTimestamp}`} marker={marker} onLoad={handleMapLoad}
                      resetFow={resetFow} width={imageWidth} height={imageHeight} isGm={isGm} onSave={saveFogOfWar}/>
        </div>
    );
}