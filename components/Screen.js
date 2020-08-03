import CreatureSideBar from "./CreatureSideBar";
import Map from "./Map";
import SideBar from "./SideBar";
import {useEffect, useRef, useState} from "react";


export default function Screen({isGm}) {
    let [sidebarWidth, setSidebarWidth] = useState(0);

    function onMapLoad(imageWidth, containerWidth) {
        setSidebarWidth((window.document.body.clientWidth - containerWidth) / 2);
    }

    return (
        <div className="d-flex justify-content-center">
            <CreatureSideBar isGm={isGm} width={sidebarWidth}/>
            <Map isGm={isGm} onLoad={onMapLoad}/>
            <SideBar isGm={isGm} width={sidebarWidth}/>
        </div>
    );
}