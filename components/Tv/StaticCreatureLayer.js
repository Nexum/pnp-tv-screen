import {useCallback, useEffect, useRef, useState} from "react";
import {Group, Layer, Rect, Image} from "react-konva";
import Konva from "konva";
import useSocket from "../../hooks/useSocket";
import Creature from "../Map/Object/Creature";

export default function StaticCreatureLayer({map, isGm}) {
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
        <Group>
            {creatures.map((v, i) => <Creature key={i} isGm={isGm} {...v}/>)}
        </Group>
    );
}