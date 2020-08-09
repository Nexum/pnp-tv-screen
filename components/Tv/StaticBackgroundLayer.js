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

export default function StaticBackgroundLayer({map, isGm, base}) {
    const rect = useRef();

    useEffect(() => {
        const background = map.background || "grass";

        const img = new Image();
        img.src = `/img/backgrounds/${backgrounds[background]}`;
        img.onload = function () {
            rect.current.fillPatternImage(img);
            rect.current.getLayer().batchDraw();
        };

    }, [map]);

    return (
        <Rect ref={rect}
              width={base.width}
              height={base.height}
        ></Rect>
    );
}