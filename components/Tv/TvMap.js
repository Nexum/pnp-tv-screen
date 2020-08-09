import {useCallback, useEffect, useRef, useState} from "react";
import {Stage, Layer, Rect, Image} from "react-konva";
import Konva from "konva";
import StaticMapLayer from "./StaticMapLayer";
import StaticCreatureLayer from "./StaticCreatureLayer";
import StaticFowLayer from "./StaticFowLayer";
import StaticMarkerLayer from "./StaticMarkerLayer";
import StaticBackgroundLayer from "./StaticBackgroundLayer";
import useSocket from "../../hooks/useSocket";

export default function TvMap({map, saveSnapshot}) {
    const stage = useRef();
    const base = {
        width: 1920,
        height: 1080,
    };

    function makeSnapShot() {
        if (!saveSnapshot) {
            return;
        }
        stage.current.batchDraw();
        const image = stage.current.toDataURL({
            quality: 1,
            x: 0,
            y: 0,
            width: base.width,
            height: base.height,
        });

        saveSnapshot(image);
    }

    useSocket("map.changed", () => {
        setTimeout(() => {
            makeSnapShot();
        }, 500);
    });
    useSocket("creatures.changed", () => {
        setTimeout(() => {
            makeSnapShot();
        }, 500);
    });

    return (
        <Stage className="screen" ref={stage}  width={base.width} height={base.height}>
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
