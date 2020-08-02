import HealthBar from "./HealthBar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";

export default function Creature({isGm, _id, name, health, currentHealth}) {
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

    return (
        <div className="creature d-flex flex-fill">
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