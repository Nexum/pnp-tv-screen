import {useCallback, useEffect, useRef, useState} from "react";
import {Stage, Layer, Rect, Image} from "react-konva";
import Konva from "konva";
import useSocket from "../../hooks/useSocket";
import Creature from "./Object/Creature";

let painting, lastLine;

export default function FowLayer({map, isGm, base}) {
    const layer = useRef();
    const fogColor = "#dedede";

    useEffect(() => {
        if (layer.current) {
            layer.current.destroyChildren();

            let newImage = null;

            if (map.fow) {
                const imageObj = document.createElement("img");
                imageObj.src = map.fow;
                imageObj.onload = function () {
                    newImage = new Konva.Image({
                        image: imageObj,
                        width: base.width,
                        height: base.height,
                    });

                    if (!isGm) {
                        newImage.cache();
                        newImage.filters([Konva.Filters.Blur]);
                        newImage.blurRadius(100);
                    }

                    layer.current.add(newImage);
                    layer.current.batchDraw();
                };
            } else {
                newImage = new Konva.Rect({
                    fill: fogColor,
                    width: base.width,
                    height: base.height,
                });

                layer.current.add(newImage);
                layer.current.batchDraw();
            }
        }
    }, [map]);

    function onMouseDown(e) {
        if (!isGm) {
            return;
        }

        painting = true;
        let pos = layer.current.getStage().getPointerPosition();

        lastLine = new Konva.Line({
            stroke: fogColor,
            strokeWidth: 30,
            opacity: 1,
            lineJoin: "round",
            lineCap: "round",
            globalCompositeOperation: "destination-out",
            points: [pos.x, pos.y],
        });

        layer.current.add(lastLine);
    }

    function onMouseUp(e) {
        if (!isGm || !painting) {
            return;
        }

        lastLine = null;
        painting = false;
        save(layer.current.toDataURL());
    }

    function onMouseMove(e) {
        if (!lastLine || !isGm || !painting) {
            return;
        }

        const pos = layer.current.getStage().getPointerPosition();
        const newPoints = lastLine.points().concat([pos.x, pos.y]);

        lastLine.points(newPoints);

        layer.current.batchDraw();
    }

    async function save(data) {
        await fetch(`/api/map/${map._id}/fow`, {
            method: "POST",
            body: JSON.stringify({
                fow: data,
            }),
        });
    }

    return (
        <Layer ref={layer}
               onMouseDown={onMouseDown}
               onMouseUp={onMouseUp}
               onMouseMove={onMouseMove}
               width={base.width}
               height={base.height}
               opacity={isGm ? 0.8 : 1}>

        </Layer>
    );
}