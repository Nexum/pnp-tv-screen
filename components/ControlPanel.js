import CreatureForm from "./CreatureForm";
import MapForm from "./MapForm";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog} from "@fortawesome/free-solid-svg-icons";
import {DropdownButton, Dropdown} from "react-bootstrap";

export default function ControlPanel(isGm) {
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

    return (
        <>
            <div className="control-panel">
                <DropdownButton title={<FontAwesomeIcon icon={faCog}/>} className="edit-button">
                    <Dropdown.Item active={activePanel.includes("creature")} eventKey="1"
                                   onClick={toggleActive.bind(null, "creature")}>Creatures</Dropdown.Item>
                    <Dropdown.Item active={activePanel.includes("map")} eventKey="2"
                                   onClick={toggleActive.bind(null, "map")}>Map File</Dropdown.Item>
                    <Dropdown.Item eventKey="1" onClick={setActivePanel.bind(null, [])}>Close All</Dropdown.Item>
                </DropdownButton>
            </div>
            {activePanel.includes("creature") && <CreatureForm onClose={toggleActive.bind(null, "creature")}/>}
            {activePanel.includes("map") && <MapForm onClose={toggleActive.bind(null, "map")}/>}
        </>
    );
}