import {useEffect, useState} from "react";
import useSocket from "../hooks/useSocket";
import Map from "./Map";
import ControlPanel from "./ControlPanel";
import ToolBar from "./ToolBar";

export default function Screen({isGm}) {
    const [map, setMap] = useState();

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

    if (!map) {
        return null;
    }

    return (
        <>
            <Map isGm={isGm} map={map}/>
            {isGm && <ControlPanel map={map}/>}
            {isGm && <ToolBar map={map}/>}
        </>
    );
}