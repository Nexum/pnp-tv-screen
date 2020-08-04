import {Stage, Layer, Rect, Image} from "react-konva";
import Konva from "konva";
import {ButtonGroup, Button, Form} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import {SketchPicker} from 'react-color';

let painting = false;
let fogColor = "#757575";

export default function FogOfWar({data, marker, width, height, isGm, onSave, resetFow}) {
    const stage = useRef();
    const layer = useRef();
    const layerMarker = useRef();
    const [activeLayer, setActiveLayer] = useState("background");
    const [mode, setMode] = useState("Erase");
    const [color, setColor] = useState("#757575");
    const [size, setSize] = useState(80);
    const [sizeActive, setSizeActive] = useState(false);
    const [colorPickerActive, setColorPickerActive] = useState(false);
    let lastLine;

    useEffect(() => {
        if (stage.current) {
            layer.current.destroyChildren();

            let newImage = null;

            if (data) {
                const imageObj = document.createElement("img");
                imageObj.src = data;
                imageObj.onload = function () {
                    newImage = new Konva.Image({
                        image: imageObj,
                        width: width,
                        height: height,
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
                    width: width,
                    height: height,
                });

                layer.current.add(newImage);
                layer.current.batchDraw();
            }
        }
    }, [data, width, height]);

    useEffect(() => {

        if (stage.current) {
            layerMarker.current.destroyChildren();

            let newImage = null;

            if (marker) {
                const imageObj = document.createElement("img");
                imageObj.src = marker;
                imageObj.onload = function () {
                    newImage = new Konva.Image({
                        image: imageObj,
                        width: width,
                        height: height,
                    });

                    layerMarker.current.add(newImage);
                    layerMarker.current.batchDraw();
                };
            } else {
                newImage = new Konva.Rect({
                    width: width,
                    height: height,
                });

                layerMarker.current.add(newImage);
                layerMarker.current.batchDraw();
            }
        }
    }, [marker, width, height]);

    function onMouseDown(e) {
        if (!isGm) {
            return;
        }

        painting = true;
        let pos = stage.current.getPointerPosition();

        lastLine = new Konva.Line({
            stroke: color,
            strokeWidth: size,
            lineJoin: "round",
            lineCap: "round",
            globalCompositeOperation: mode === "Paint" ? 'source-over' : "destination-out",
            points: [pos.x, pos.y],
        });

        const currLayer = getActiveLayer();
        currLayer.add(lastLine);
    }

    function onMouseUp(e) {
        if (!isGm || !painting) {
            return;
        }

        onSave(layer.current.toDataURL(), layerMarker.current.toDataURL());
        lastLine = null;
        painting = false;
    }

    function onMouseMove(e) {
        if (!lastLine || !isGm || !painting) {
            return;
        }

        const pos = stage.current.getPointerPosition();
        const newPoints = lastLine.points().concat([pos.x, pos.y]);

        lastLine.points(newPoints);

        const currLayer = getActiveLayer();
        currLayer.batchDraw();
    }

    function getActiveLayer() {
        if (activeLayer === "background") {
            return layer && layer.current;
        } else if (activeLayer === "foreground") {
            return layerMarker && layerMarker.current;
        }
    }

    function toggleMode() {
        setMode(mode === "Erase" ? "Paint" : "Erase");
        if (mode !== "Paint") {
            setColorPickerActive(false);
            setColor(fogColor);
        }
    }

    function toggleActiveLayer() {
        setActiveLayer(activeLayer === "background" ? "foreground" : "background");
    }

    function toggleColorPicker() {
        setColorPickerActive(!colorPickerActive);
    }

    function colorSelected({hex}) {
        setColor(hex);
    }

    function sizeChanged(e) {
        setSize(e.currentTarget.value);
    }

    return (
        <>
            {
                <Stage style={{opacity: isGm ? 0.8 : 1}} ref={stage} width={width} height={height}
                       onMouseDown={onMouseDown}
                       onMouseLeave={onMouseUp} g
                       onMouseUp={onMouseUp}
                       onMouseMove={onMouseMove}
                       className={"fog-of-war"}>
                    <Layer ref={layer}>
                    </Layer>
                    <Layer ref={layerMarker}>
                    </Layer>
                </Stage>
            }
            {isGm && (
                <>
                    <ButtonGroup className="modeToggle">
                        <Button onClick={toggleMode} className="btn btn-dark">Mode: {mode}</Button>
                        <Button onClick={toggleActiveLayer} className="btn btn-dark">Layer: {activeLayer}</Button>
                        <Form.Control type={"range"} onChange={sizeChanged} min={5} max={160} value={size} className="size-select"/>
                        {mode === "Paint" && <Button onClick={toggleColorPicker} className="btn btn-dark">Color</Button>}
                    </ButtonGroup>
                    {colorPickerActive && <SketchPicker color={color} onChange={colorSelected} className="color-picker"/>}
                </>
            )}
        </>
    );
}