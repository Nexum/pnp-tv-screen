import {useCallback, useEffect, useRef, useState} from "react";
import {Group, Layer} from "react-konva";
import Konva from "konva";
import useSocket from "../../hooks/useSocket";
import Creature from "./Object/Creature";

let painting, lastLine;

export default function FowLayer({map, isGm, base}) {
    const layer = useRef();
    const group = useRef();
    const fogColor = "#dedede";

    useEffect(() => {
        if (group.current) {
            group.current.destroyChildren();

            try {

                if (!map.fow) {
                    throw new Error("no fow");
                }

                const fowData = JSON.parse(map.fow);
                const image = Konva.Group.create(fowData);

                image.cache();
                if (!isGm) {
                    image.filters([Konva.Filters.Blur]);
                    image.blurRadius(100);
                }

                group.current.add(image);
                layer.current.batchDraw();
            } catch (e) {

                const image = new Konva.Rect({
                    fill: fogColor,
                    width: base.width,
                    height: base.height,
                });

                group.current.add(image);
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
            strokeWidth: 60,
            opacity: 2,
            lineJoin: "round",
            lineCap: "round",
            globalCompositeOperation: "destination-out",
            points: [
                pos.x / layer.current.getStage().scaleX(),
                pos.y / layer.current.getStage().scaleY(),
            ],
        });

        group.current.add(lastLine);
    }

    function onMouseUp(e) {
        if (!isGm || !painting) {
            return;
        }

        lastLine = null;
        painting = false;
        save(group.current.toJSON());
    }

    function onMouseMove(e) {
        if (!lastLine || !isGm || !painting) {
            return;
        }

        const pos = layer.current.getStage().getPointerPosition();

        const newPoints = lastLine.points().concat([
            pos.x / layer.current.getStage().scaleX(),
            pos.y / layer.current.getStage().scaleY(),
        ]);

        lastLine.points(newPoints);
        layer.current.batchDraw();
    }

    async function save(data) {
        if (!isGm) {
            return;
        }

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
               opacity={isGm ? 0.8 : 1}>
            <Group ref={group}/>
        </Layer>
    );
}