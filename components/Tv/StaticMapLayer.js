import {useCallback, useEffect, useRef, useState} from "react";
import {Group} from "react-konva";
import Konva from "konva";


export default function StaticMapLayer({map, base}) {
    const layer = useRef();

    useEffect(() => {
        Konva.Image.fromURL(`/api/file/${map._id}/png?loadTimestamp=${Date.now()}`, function (image) {
            // delete everything
            layer.current.destroyChildren();

            // scale image to fit
            const imageScale = (base.height / image.height());

            image.scale({
                x: imageScale,
                y: imageScale,
            });

            image.width(Math.round(image.width() * image.scaleX()));
            image.height(Math.round(image.height() * image.scaleY()));
            image.scaleX(1);
            image.scaleY(1);

            // move image to center
            const centerX = (layer.current.getLayer().width() / 2) - (image.width() / 2);
            image.position({
                x: centerX,
                y: 0,
            });

            image.cache();
            layer.current.add(image);
            layer.current.getLayer().batchDraw();
        });
    }, [map]);

    return (
        <Group ref={layer} listening={false}></Group>
    );
}