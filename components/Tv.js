import {useEffect, useState} from "react";
import useSocket from "../hooks/useSocket";
import TvMap from "./Tv/TvMap";

export default function Screen({}) {
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

    return (
        <>
            {map && <TvMap map={map}/>}
        </>
    );
}