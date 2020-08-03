import {Stage, Layer, Rect, Image} from "react-konva";
import Konva from "konva";
import {useEffect, useRef, useState} from "react";
import useSocket from "../hooks/useSocket";

export default function FogOfWar({data, width, height, isGm, onSave}) {
    const stage = useRef();
    const layer = useRef();
    const [mode, setMode] = useState("erazor");
    let lastLine;

    useEffect(() => {
        if (stage.current && data) {
            layer.current.destroyChildren();

            const imageObj = document.createElement("img");
            imageObj.src = data;

            const imported = new Konva.Image({
                x: 0,
                y: 0,
                image: imageObj,
                width: width,
                height: height,
            });

            layer.current.add(imported);
            layer.current.batchDraw();
        }
    }, [data]);

    function onMouseDown(e) {
        if (!isGm) {
            return;
        }

        let pos = stage.current.getPointerPosition();

        lastLine = new Konva.Line({
            stroke: '#FFFFFF',
            strokeWidth: 100,
            lineJoin: "round",
            lineCap: "round",
            globalCompositeOperation: mode === "brush" ? 'source-over' : "destination-out",
            points: [pos.x, pos.y],
        });

        layer.current.add(lastLine);
    }

    function onMouseUp(e) {
        if (!isGm) {
            return;
        }
        onSave(stage.current.toDataURL());
        lastLine = null;
    }

    function onMouseMove(e) {
        if (!lastLine || !isGm) {
            return;
        }

        const pos = stage.current.getPointerPosition();
        const newPoints = lastLine.points().concat([pos.x, pos.y]);

        lastLine.points(newPoints);
        layer.current.batchDraw();
    }

    return (
        <>
            {
                <Stage style={{opacity: isGm ? 0.8 : 1}} ref={stage} width={width} height={height}
                       onMouseDown={onMouseDown}
                       onMouseLeave={onMouseUp}g
                       onMouseUp={onMouseUp}
                       onMouseMove={onMouseMove}
                       className={"fog-of-war"}>
                    <Layer ref={layer}>
                        {!data && <Image width={width} height={height} fill={"#757575"}></Image>}
                    </Layer>
                </Stage>
            }
        </>
    );
}