import {useEffect, useState} from "react";
import Creature from "./Creature";
import useSocket from "../hooks/useSocket";

export default function CreatureLayer({isGm, factor}) {
    const [creatures, setCreatures] = useState([]);

    async function getData() {
        const data = await fetch("/api/creature/find", {
            method: "GET",
        });

        setCreatures(await data.json());
    }

    useEffect(() => {
        getData();
    }, []);

    useSocket("creatures.changed", () => {
        getData();
    });

    return (
        <>
            {creatures.map((creature, i) => {
                return (
                    <Creature {...creature} key={i} isGm={isGm} factor={factor}/>
                );
            })}
        </>
    );
}