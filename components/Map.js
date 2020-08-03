import {useCallback, useEffect, useRef, useState} from "react";
import useSocket from "../hooks/useSocket";
import FogOfWar from "./FogOfWar";

export default function Map({className, mapName, fow, isGm}) {
    const [imageLoadTimestamp, setImageLoad] = useState();
    const [imageWidth, setImageWidth] = useState();
    const [imageHeight, setImageHeight] = useState();
    const [fowEnabled, setFowEnabled] = useState(false);
    const mapRef = useRef();
    const containerRef = useRef();

    useSocket(`file.${mapName}.changed`, () => {
        setImageLoad(Date.now());
    });

    useEffect(() => {
        setFowEnabled(false);
        setTimeout(() => {
            setFowEnabled(true);
        });
    }, [mapName]);

    function handleMapLoad(e) {
        containerRef.current.style.width = "auto";
        setImageWidth(mapRef.current.clientWidth);
        setImageHeight(mapRef.current.clientHeight);
    }

    async function saveFogOfWar(data) {
        await fetch(`/api/map/${mapName}/fow`, {
            method: "POST",
            body: JSON.stringify({
                data,
            }),
        });
    }

    return (
        <div className={(className || "") + " map d-flex align-content-center justify-content-center"} ref={containerRef} style={{width: imageWidth}}>
            <div className="background-image">
                {fowEnabled && <FogOfWar data={fow} width={imageWidth} height={imageHeight} isGm={isGm} onSave={saveFogOfWar}/>}
                <img style={{opacity: !fowEnabled ? 0 : 1}} ref={mapRef} onLoad={handleMapLoad}
                     src={`/api/file/${mapName}/png?loadTimestamp=${imageLoadTimestamp}`}/>
            </div>
        </div>
    );
}