import {useCallback, useEffect, useRef, useState} from "react";
import {Stage, Layer, Rect, Image} from "react-konva";
import Konva from "konva";
import MapLayer from "./Map/MapLayer";
import CreatureLayer from "./Map/CreatureLayer";
import FowLayer from "./Map/FowLayer";
import MarkerLayer from "./Map/MarkerLayer";
import BackgroundLayer from "./Map/BackgroundLayer";
import useSocket from "../hooks/useSocket";

export default function Map({map, isGm, gmOptions}) {
    const stage = useRef();
    const base = {
        width: 1920,
        height: 1080,
    };
    const [screenSize, setScreenSize] = useState({
        width: window.document.body.clientWidth,
        height: window.document.body.clientHeight,
    });
    const [scale, setScale] = useState({
        x: screenSize.height / base.height,
        y: screenSize.height / base.height,
    });
    const layers = {
        background: <BackgroundLayer key="background" map={map} isGm={isGm} base={base} gmOptions={gmOptions}></BackgroundLayer>,
        map: <MapLayer key="map" map={map} isGm={isGm} base={base} gmOptions={gmOptions}></MapLayer>,
        fow: <FowLayer key="fow" map={map} isGm={isGm} base={base} gmOptions={gmOptions}></FowLayer>,
        marker: <MarkerLayer key="marker" map={map} isGm={isGm} base={base} gmOptions={gmOptions}></MarkerLayer>,
        creature: <CreatureLayer key="creature" map={map} isGm={isGm} base={base} gmOptions={gmOptions}></CreatureLayer>,
    };

    let layerOrder = [
        "background",
        "map",
        "marker",
        "fow",
        "creature",
    ];
    if (gmOptions.activeLayer === "marker") {
        layerOrder = [
            "background",
            "map",
            "fow",
            "marker",
            "creature",
        ];
    }

    async function saveSnapshot() {
        const image = stage.current.toDataURL({
            quality: 1,
            x: 0,
            y: 0,
            width: base.width,
            height: base.height,
        });
        const blobBin = atob(image.split(',')[1]);
        const array = [];
        for (let i = 0; i < blobBin.length; i++) {
            array.push(blobBin.charCodeAt(i));
        }
        const file = new Blob([new Uint8Array(array)], {type: 'image/png'});
        const data = new FormData();
        data.append("file", file);
        fetch(`/api/snapshot/${map._id}/upload`, {
            method: "POST",
            body: data,
        });
    }

    return (
        <Stage className="screen" ref={stage} scale={scale} width={base.width} height={base.height}>
            {layerOrder.map((v, i) => {
                return layers[v];
            })}
        </Stage>
    );
}
