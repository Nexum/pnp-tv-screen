import {useEffect, useRef, useState} from "react";
import {Layer, Rect} from "react-konva";
import Konva from "konva";

const backgrounds = {
    darkwood: "darkwood.jpg",
    grass: "grass.png",
    grassdry: "grassdry.jpg",
    lava: "lava.png",
    parchment: "parchment.jpg",
    stone_tiles: "stone_tiles.jpg",
    wood: "wood.jpg",
};

export default function BackgroundLayer({map, isGm, base}) {
    const layer = useRef();
    const rect = useRef();

    useEffect(() => {
        const background = map.background || "grass";

        const img = new Image();
        img.src = `/img/backgrounds/${backgrounds[background]}`;
        img.onload = function() {
            rect.current.fillPatternImage(img);
            layer.current.batchDraw();
        }

    }, [map]);

    return (
        <Layer ref={layer}>
            <Rect ref={rect}
                  width={base.width}
                  height={base.height}
            ></Rect>
        </Layer>
    );
}