import {useCallback, useEffect, useRef, useState} from "react";
import {Stage, Layer, Rect, Image} from "react-konva";
import Konva from "konva";


export default function MapLayer({map}) {
    const layer = useRef();

    useEffect(() => {
        Konva.Image.fromURL(`/api/file/${map._id}/png?loadTimestamp=${Date.now()}`, function (image) {
            // delete everything
            layer.current.destroyChildren();

            // scale image to fit
            const imageScale = (layer.current.height() / image.height());
            image.scale({
                x: imageScale,
                y: imageScale,
            });

            // move image to center
            const centerX = (layer.current.width() / 2) - (image.width() / 2);
            image.x(centerX);

            // draw image
            layer.current.add(image);
            layer.current.draw();
        });
    }, [map]);

    return (
        <Layer ref={layer}></Layer>
    );
}