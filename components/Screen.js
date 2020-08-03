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
    const [mapName, setMapName] = useState("default-map");
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


    async function getActiveMap() {
        const data = await fetch("/api/map/active", {
            method: "GET",
        });

        try {
            const map = await data.json();

            if (map) {
                setMapName(map._id);
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

    return (
        <div className="">
            <div className="screen" ref={layer}>
                <div className="screen-content">
                    <DndContainer className="d-flex justify-content-center" factor={factor}>
                        <CreatureLayer isGm={isGm} factor={factor} mapName={mapName}/>
                        <SideBar isGm={isGm}/>
                        <Map isGm={isGm} factor={factor} mapName={mapName}/>
                        <SideBar isGm={isGm}/>
                    </DndContainer>
                </div>
            </div>
            {isGm && <ControlPanel mapName={mapName}/>}
        </div>
    );
}