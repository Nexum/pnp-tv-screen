import {useEffect, useState} from "react";
import useSocket from "../hooks/useSocket";
import TvMap from "./Tv/TvMap";

export default function Screen({saveSnapshot}) {
    const [map, setMap] = useState();
    const [loadTimestamp, setLoadTimestamp] = useState();

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

        setLoadTimestamp(Date.now());
    }

    useEffect(() => {
        getActiveMap();
    }, []);

    useSocket(`snapshot.changed`, () => {
        getActiveMap();
    });

    if (!map) {
        return null;
    }

    return (
        <img className={"snapshot-image"} src={`/api/snapshot/${map._id}/png?load=${loadTimestamp || 0}`}/>
    );
}