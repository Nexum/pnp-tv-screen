import {useCallback, useEffect, useRef, useState} from "react";
import {Stage, Layer, Rect, Image} from "react-konva";
import Konva from "konva";
import MapLayer from "./Map/MapLayer";
import CreatureLayer from "./Map/CreatureLayer";
import FowLayer from "./Map/FowLayer";
import BackgroundLayer from "./Map/BackgroundLayer";

export default function Map({map, isGm}) {
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

    return (
        <Stage className="screen" ref={stage} scale={scale} width={base.width} height={base.height}>
            <BackgroundLayer map={map} isGm={isGm} base={base}></BackgroundLayer>
            <MapLayer map={map} isGm={isGm} base={base}></MapLayer>
            <FowLayer map={map} isGm={isGm} base={base}></FowLayer>
            <CreatureLayer map={map} isGm={isGm} base={base}></CreatureLayer>
        </Stage>
    );
}