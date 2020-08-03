import HealthBar from "./HealthBar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";
import {useDrag} from "react-dnd";

export default function Creature({isGm, _id, name, pos, health, currentHealth, factor}) {
    async function deleteCreature() {
        await fetch(`/api/creature/${_id}/delete`, {
            method: "DELETE",
        });
    }

    async function setCreatureHealth(modifier = 0) {
        await fetch(`/api/creature/${_id}/save`, {
            method: "POST",
            body: JSON.stringify({
                health: health,
                currentHealth: (currentHealth) + modifier,
            }),
        });
    }

    const [{isDragging}, drag] = useDrag({
        item: {
            _id,
            pos: pos || {
                x: 0,
                y: 0,
            },
            type: "creature",
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    if (isDragging) {
        return <div ref={drag}/>;
    }

    return (
        <div ref={drag} className="creature d-flex flex-fill" style={{
            top: pos.y + "%",
            left: pos.x + "%",
            width: Math.round(250 * factor) + "px",
            height: Math.round(31 * factor) + "px",
        }}>
            {isGm && (
                <button className="btn btn-primary btn-sm" onClick={setCreatureHealth.bind(null, -1)}>
                    <FontAwesomeIcon icon={faMinus}/>
                </button>
            )}
            <HealthBar health={health} current={currentHealth} className="flex-fill" label={name}/>
            {isGm && (
                <>
                    <button className="btn btn-primary btn-sm" onClick={setCreatureHealth.bind(null, 1)}>
                        <FontAwesomeIcon icon={faPlus}/>
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={deleteCreature}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </button>
                </>
            )}
        </div>
    );

}