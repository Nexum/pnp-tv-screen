import {Group, Text, Rect, Transformer} from "react-konva";
import Konva from "konva";
import {useEffect, useRef, useState} from "react";

export default function Creature({name, width, scale, rotation, _id, height, pos, health, currentHealth}) {
    const group = useRef();
    const transformer = useRef();
    const [label, setLabel] = useState();
    const [percentage, setPercentage] = useState(100);
    const [isDragging, setIsDragging] = useState(false);
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        setPercentage(Math.round((currentHealth / health) * 100) / 2);
    }, [health, currentHealth]);

    useEffect(() => {
        setLabel(`${name} ${percentage}%`);
    }, [name, percentage]);

    useEffect(() => {
        if (isSelected) {
            console.log("Creature.js:50 / toggleSelected", 1);
            transformer.current.setNode(group.current);
            transformer.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    async function saveCreature(data) {
        await fetch(`/api/creature/${_id}/save`, {
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    function onDragStart() {
        setIsDragging(true);
    }

    function onDragEnd(e) {
        setIsDragging(false);
        saveCreature({
            pos: {
                x: e.target.x(),
                y: e.target.y(),
            },
        });
    }

    function onTransformEnd(e) {
        saveCreature({
            pos: {
                x: e.target.x(),
                y: e.target.y(),
            },
            scale: {
                x: e.target.scaleX(),
                y: e.target.scaleY(),
            },
            rotation: e.target.rotation(),
        });
    }

    function toggleSelected() {
        setIsSelected(!isSelected);
    }

    return (
        <>
            <Group
                ref={group}
                x={pos.x}
                y={pos.y}
                scaleX={scale.x}
                scaleY={scale.y}
                rotation={rotation}
                draggable
                onTransformEnd={onTransformEnd}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onClick={toggleSelected}
                width={width}
                height={height}
            >
                <Rect width={width} height={height} fill={"#FFFFFF"}>
                </Rect>
                <Rect width={width * (percentage / 100)} height={height} fill={"#FF0000"}>
                </Rect>

                <Text text={label}/>
            </Group>
            {isSelected && (
                <Transformer
                    ref={transformer}
                />
            )}
        </>
    );

}