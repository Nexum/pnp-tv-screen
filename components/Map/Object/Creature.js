import {Group, Text, Rect, Transformer} from "react-konva";
import Konva from "konva";
import {useEffect, useRef, useState} from "react";
import Button from "./Button";

export default function Creature({name, width, scale, visible, rotation, _id, height, pos, health, currentHealth}) {
    const group = useRef();
    const transformer = useRef();
    const [label, setLabel] = useState();
    const [percentage, setPercentage] = useState(currentHealth / health);
    const [isDragging, setIsDragging] = useState(false);
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        setPercentage(Math.round((currentHealth / health) * 100));
    }, [health, currentHealth]);

    useEffect(() => {
        setLabel(`${name} ${percentage}%`);
    }, [name, percentage]);

    useEffect(() => {
        if (isSelected) {
            transformer.current.setNode(group.current);
            transformer.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    async function saveCreature(data, e) {
        if (e) {
            e.cancelBubble = true;
        }

        await fetch(`/api/creature/${_id}/save`, {
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async function deleteCreature() {
        await fetch(`/api/creature/${_id}/delete`, {
            method: "POST",
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

                <Rect width={width * (percentage / 100)} height={height} fill={"#ff6060"}>
                </Rect>

                <Text text={label}
                      padding={10}
                      fontStyle={"bold"}/>
                <Text
                    text="👁"
                    fontSize={36}
                    x={160}
                    fill={visible ? "#a5ff6c" : "#FF0000"}
                    onClick={saveCreature.bind(null, {
                        visible: !visible,
                    })}
                />

                {isSelected && <Button
                    color={"#650e0e"}
                    textColor={"#FFFFFF"}
                    x={0}
                    y={group.current.height() + 5}
                    label={"Hit"}
                    onClick={saveCreature.bind(null, {
                        currentHealth: currentHealth - 1,
                    })}
                />}

                {isSelected && <Button
                    color={"#a5ff6c"}
                    x={40}
                    y={group.current.height() + 5}
                    label={"Heal"}
                    onClick={saveCreature.bind(null, {
                        currentHealth: currentHealth + 1,
                    })}
                />}

                {isSelected && <Button
                    color={"#a5ff6c"}
                    x={89}
                    y={group.current.height() + 5}
                    label={"Delete"}
                    onClick={deleteCreature}
                />}
            </Group>

            {isSelected && (
                <Transformer
                    ref={transformer}
                />
            )}
        </>
    );

}