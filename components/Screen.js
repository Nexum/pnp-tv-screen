import CreatureLayer from "./CreatureLayer";
import Map from "./Map";
import SideBar from "./SideBar";
import {useEffect, useRef, useState} from "react";
import DndContainer from "./DndContainer";
import ControlPanel from "./ControlPanel";
import useSocket from "../hooks/useSocket";


export default function Screen({isGm}) {
    const layer = useRef();
    const [factor, setFactor] = useState(1);
    const [mapName, setMapName] = useState(null);
    const [mapFow, setMapFow] = useState(null);
    const [mapMarker, setMapMarker] = useState(null);
    const [layerWidth, setLayerWidth] = useState(null);

    useEffect(() => {
        if (layer.current) {
            setLayerWidth(layer.current.clientWidth);
        }
    }, [mapName]);

    useEffect(() => {
        if (!layerWidth) {
            return;
        }

        let newfactor = layerWidth / 1280;
        setFactor(newfactor);

    }, [layerWidth]);

    function resetFow() {
        saveFogOfWar(null);
    }

    async function saveFogOfWar(data, marker) {
        await fetch(`/api/map/${mapName}/fow`, {
            method: "POST",
            body: JSON.stringify({
                data,
                marker,
            }),
        });
    }

    async function getActiveMap() {
        const data = await fetch("/api/map/active", {
            method: "GET",
        });

        try {
            const map = await data.json();

            if (map) {
                setMapName(map._id);
                setMapFow(map.fow);
                setMapMarker(map.marker);
            }
        } catch (e) {

        }
    }

    useEffect(() => {
        getActiveMap();
    }, []);

    useSocket("map.activated", () => {
        getActiveMap();
    });

    useSocket(`map.${mapName}.changed`, () => {
        getActiveMap();
    });

    if (!mapName) {
        return null;
    }

    return (
        <>
            <DndContainer factor={factor}>
                <CreatureLayer isGm={isGm} factor={factor} mapName={mapName}/>
                <div className="screen d-flex justify-content-center" ref={layer}>
                    <Map isGm={isGm} factor={factor} mapName={mapName} fow={mapFow} marker={mapMarker} resetFow={resetFow} saveFogOfWar={saveFogOfWar}/>
                </div>
            </DndContainer>
            {isGm && <ControlPanel mapName={mapName} resetFow={resetFow}/>}
        </>
    );
}