import CreatureLayer from "./CreatureLayer";
import Map from "./Map";
import SideBar from "./SideBar";
import {useEffect, useRef, useState} from "react";
import DndContainer from "./DndContainer";
import ControlPanel from "./ControlPanel";


export default function Screen({isGm}) {
    const layer = useRef();
    const [factor, setFactor] = useState(1);
    const [layerWidth, setLayerWidth] = useState(null);

    useEffect(() => {
        if (layer.current) {
            setLayerWidth(layer.current.clientWidth);
        }
    }, []);

    useEffect(() => {
        if (!layerWidth) {
            return;
        }

        let newfactor = layerWidth / 1280;
        setFactor(newfactor);

    }, [layerWidth]);

    function onMapLoad(imageWidth) {
    }

    return (
        <div className="">
            <div className="screen" ref={layer}>
                <div className="screen-content">
                    <DndContainer className="d-flex justify-content-center" factor={factor}>
                        <CreatureLayer isGm={isGm} factor={factor}/>
                        <SideBar isGm={isGm}/>
                        <Map isGm={isGm} onLoad={onMapLoad} factor={factor}/>
                        <SideBar isGm={isGm}/>
                    </DndContainer>
                </div>
            </div>
            {isGm && <ControlPanel/>}
        </div>
    );
}