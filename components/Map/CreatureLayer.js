import {useCallback, useEffect, useRef, useState} from "react";
import {Stage, Layer, Rect, Image} from "react-konva";
import Konva from "konva";
import useSocket from "../../hooks/useSocket";
import Creature from "./Object/Creature";

export default function CreatureLayer({map, isGm}) {
    const layer = useRef();
    const [creatures, setCreatures] = useState([]);

    async function getData() {
        if (!map) {
            setCreatures([]);
            return;
        }

        const data = await fetch(`/api/creature/find?map=${map._id}&isGm=${isGm}`, {
            method: "GET",
        });
        setCreatures(await data.json());
    }

    useEffect(() => {
        getData();
    }, [map]);

    useSocket("creatures.changed", () => {
        getData();
    });

    return (
        <Layer ref={layer}>
            {creatures.map((v, i) => <Creature key={i} {...v}/>)}
        </Layer>
    );
}