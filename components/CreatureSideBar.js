import {useEffect, useState} from "react";
import Creature from "./Creature";
import CreatureForm from "./CreatureForm";
import useSocket from "../hooks/useSocket";

export default function CreatureSideBar({isGm, className}) {
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
        <div className={className + " sidebar creature-sidebar"}>
            {creatures.map((creature, i) => {
                return (
                    <Creature {...creature} key={i} isGm={isGm}/>
                );
            })}
            {isGm && <CreatureForm/>}
        </div>
    );
}