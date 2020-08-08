import {useEffect, useState} from "react";
import useSocket from "../hooks/useSocket";
import Map from "./Map";
import ToolBar from "./ToolBar";
import gm from "../pages/gm";

export default function Screen({isGm}) {
    const [map, setMap] = useState();
    const [gmOptions, setGmOptions] = useState({
        fowBrushSize: 120,
        fowMode: "remove"
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

    return (
        <>
            {map && <Map isGm={isGm} map={map} gmOptions={gmOptions}/>}
            {isGm && <ToolBar map={map} setGmOptions={changeGmOptions} gmOptions={gmOptions}/>}
        </>
    );
}