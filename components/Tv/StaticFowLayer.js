import {useEffect, useRef, useState} from "react";
import {Group, Layer, Line, Rect} from "react-konva";
import Konva from "konva";

let painting;

export default function StaticFowLayer({map, isGm, base, gmOptions}) {
    const layer = useRef();
    const fow = useRef();

    useEffect(() => {
        if (layer.current) {
            if (fow.current) {
                fow.current.destroy();
            }

            if (!map.fow && layer.current) {
                layer.current.getLayer().batchDraw();
                return;
            }

            const imageObj = document.createElement("img");
            imageObj.src = map.fow;
            imageObj.onload = function () {
                const newImage = new Konva.Image({
                    image: imageObj,
                    width: layer.current.getStage().width(),
                    height: layer.current.getStage().height(),
                    globalCompositeOperation: "destination-out",
                });

                newImage.cache();
                newImage.filters([Konva.Filters.Blur]);
                newImage.blurRadius(50);

                fow.current = newImage;
                layer.current.add(newImage);
                newImage.moveToTop();
                layer.current.getLayer().batchDraw();
            };
        }
    }, [map]);

    useEffect(() => {
        Konva.Image.fromURL(`/img/fow_base_2.jpg`, function (image) {
            image.cache();
            if (isGm) {
                image.opacity(0.8);
            }
            image.filters([Konva.Filters.Grayscale]);

            layer.current.add(image);
            image.moveToBottom();
            layer.current.getLayer().batchDraw();
        });
    }, []);

    return (
        <Group ref={layer} listening={false}>
        </Group>
    );
}