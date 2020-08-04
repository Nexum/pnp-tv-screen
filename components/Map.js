import {useCallback, useEffect, useRef, useState} from "react";
import {Stage, Layer, Rect, Image} from "react-konva";
import Konva from "konva";
import MapLayer from "./Map/MapLayer";


export default function Map({map, isGm}) {
    const stage = useRef();
    const fowLayer = useRef();

    return (
        <Stage ref={stage} width={window.document.body.clientWidth} height={window.document.body.clientHeight}>
            <Layer ref={fowLayer}></Layer>
            <MapLayer map={map} isGm={isGm}></MapLayer>
        </Stage>
    );
}