import CreatureForm from "./ControlPanel/CreatureForm";
import MapForm from "./ControlPanel/MapForm";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog} from "@fortawesome/free-solid-svg-icons";
import {DropdownButton, Dropdown} from "react-bootstrap";

export default function ControlPanel({map}) {
    const [activePanel, setActivePanel] = useState([]);

    return (
        <>
            <div className="toolbar">

            </div>
        </>
    );
}