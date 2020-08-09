import {useEffect, useRef, useState} from "react";
import {Group, Layer, Line, Rect} from "react-konva";
import Konva from "konva";
import gm from "../../pages/gm";

let painting;

export default function FowLayer({map, base}) {
    const group = useRef();

    useEffect(() => {
        if (group.current) {
            if (!map.marker) {
                return;
            }

            const imageObj = document.createElement("img");
            imageObj.src = map.marker;
            imageObj.onload = function () {
                const newImage = new Konva.Image({
                    image: imageObj,
                    width: group.current.getStage().width(),
                    height: group.current.getStage().height(),
                });

                group.current.add(newImage);
                newImage.moveToTop();
            };
        }
    }, [map]);

    return (
        <Group
            ref={group}
            width={base.width}
            height={base.height}
        >
        </Group>
    );
}