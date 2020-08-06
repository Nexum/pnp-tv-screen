import CreatureForm from "./ControlPanel/CreatureForm";
import MapForm from "./ControlPanel/MapForm";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog} from "@fortawesome/free-solid-svg-icons";
import {DropdownButton, Dropdown} from "react-bootstrap";

export default function ControlPanel({map}) {
    const [activePanel, setActivePanel] = useState([]);

    function toggleActive(panel) {
        const existingIndex = activePanel.indexOf(panel);

        if (existingIndex !== -1) {
            const newActivePanel = [...activePanel];
            newActivePanel.splice(existingIndex, 1);
            setActivePanel([...newActivePanel]);
        } else {
            setActivePanel([...activePanel, panel]);
        }
    }


    async function resetFow() {
        await fetch(`/api/map/${map._id}/fow`, {
            method: "POST",
            body: JSON.stringify({
                fow: null,
            }),
        });
    }

    return (
        <>
            <div className="control-panel">
                <DropdownButton title={<FontAwesomeIcon icon={faCog}/>} className="edit-button">
                    <Dropdown.Item active={activePanel.includes("creature")} eventKey="1"
                                   onClick={toggleActive.bind(null, "creature")}>Creatures</Dropdown.Item>
                    <Dropdown.Item active={activePanel.includes("map")} eventKey="2"
                                   onClick={toggleActive.bind(null, "map")}>Maps</Dropdown.Item>
                    <Dropdown.Item eventKey="3" onClick={resetFow}>Reset FOW</Dropdown.Item>
                    <Dropdown.Item eventKey="4" onClick={setActivePanel.bind(null, [])}>Close All</Dropdown.Item>
                </DropdownButton>
            </div>
            {activePanel.includes("creature") && <CreatureForm map={map} onClose={toggleActive.bind(null, "creature")}/>}
            {activePanel.includes("map") && <MapForm map={map} onClose={toggleActive.bind(null, "map")}/>}
        </>
    );
}