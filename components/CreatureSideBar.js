import {useEffect, useState} from "react";
import Creature from "./Creature";
import CreatureForm from "./CreatureForm";
import useSocket from "../hooks/useSocket";
import SideBar from "./SideBar";

export default function CreatureSideBar({isGm, className, width}) {
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
        <SideBar className={className + " creature-sidebar"} width={width}>
            {creatures.map((creature, i) => {
                return (
                    <Creature {...creature} key={i} isGm={isGm}/>
                );
            })}
            {isGm && <CreatureForm/>}
        </SideBar>
    );
}