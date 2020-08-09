import {useEffect, useState} from "react";
import useSocket from "../hooks/useSocket";
import Map from "./Map";
import ToolBar from "./ToolBar";
import gm from "../pages/gm";
import TvMap from "./Tv/TvMap";

export default function Screen({isGm}) {
    const [map, setMap] = useState();
    const [gmOptions, setGmOptions] = useState({
        fowBrushSize: 120,
        fowMode: "remove",
        paintBrushSize: 40,
        paintColor: "#FF0000",
        paintColorRBGA: {
            r: 255,
            g: 0,
            b: 0,
            a: 0.8,
        },
        paintColorAlpha: 1,
        paintMode: "paint",
    });

    async function getActiveMap() {
        const data = await fetch("/api/map/active", {
            method: "GET",
        });

        try {
            const map = await data.json();

            setMap(map || null);
        } catch (e) {
            setMap(null);
        }
    }

    useEffect(() => {
        getActiveMap();
    }, []);

    useSocket("map.activated", () => {
        getActiveMap();
    });

    useSocket(`map.changed`, () => {
        getActiveMap();
    });

    function changeGmOptions(update) {
        setGmOptions({
            ...gmOptions,
            ...update,
        });
    }

    async function saveSnapshot(image) {
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
        <>
            {map && <Map isGm={isGm} map={map} gmOptions={gmOptions}/>}
            {map && <TvMap map={map} saveSnapshot={saveSnapshot}/>}
            {isGm && <ToolBar map={map} setGmOptions={changeGmOptions} gmOptions={gmOptions}/>}
        </>
    );
}