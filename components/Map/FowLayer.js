import {useCallback, useEffect, useRef, useState} from "react";
import {Stage, Layer, Rect, Image} from "react-konva";
import Konva from "konva";
import useSocket from "../../hooks/useSocket";
import Creature from "./Object/Creature";

export default function FowLayer({map, isGm, base}) {
    const layer = useRef();

    return (
        <Layer ref={layer} fill={"#FFFFFF"} width={base.width} height={base.height} opacity={isGm ? 0 : 0}>
            <Rect fill={"#FFFFFF"} width={base.width} height={base.height}></Rect>
        </Layer>
    );
}