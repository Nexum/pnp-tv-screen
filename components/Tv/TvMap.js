import {useCallback, useEffect, useRef, useState} from "react";
import {Stage, Layer, Rect, Image} from "react-konva";
import Konva from "konva";
import StaticMapLayer from "./StaticMapLayer";
import StaticCreatureLayer from "./StaticCreatureLayer";
import StaticFowLayer from "./StaticFowLayer";
import StaticMarkerLayer from "./StaticMarkerLayer";
import StaticBackgroundLayer from "./StaticBackgroundLayer";
import useSocket from "../../hooks/useSocket";

export default function TvMap({map, isGm}) {
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
            <Layer listening={false}>
                <StaticBackgroundLayer key="background" map={map} base={base}></StaticBackgroundLayer>
                <StaticMapLayer key="map" map={map} base={base}></StaticMapLayer>
            </Layer>
            <Layer listening={false}>
                <StaticFowLayer key="fow" map={map} base={base}></StaticFowLayer>
                <StaticMarkerLayer key="marker" map={map} base={base}></StaticMarkerLayer>
                <StaticCreatureLayer key="creature" map={map} base={base}></StaticCreatureLayer>
            </Layer>
        </Stage>
    );
}
