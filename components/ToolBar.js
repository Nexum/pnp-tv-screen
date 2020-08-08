import {useRef, useState} from "react";
import FowConfig from "./ToolBar/FowConfig";
import ConfigWindow from "./ToolBar/ConfigWindow";
import MapConfig from "./ToolBar/MapConfig";
import CreatureConfig from "./ToolBar/CreatureConfig";

export default function ControlPanel({map, setGmOptions, gmOptions}) {
    const panels = [
        {
            label: "FOW",
            config: FowConfig,
            button: useRef(),
        },
        {
            label: "Maps",
            config: MapConfig,
            button: useRef(),
        },
        {
            label: "Creatures",
            button: useRef(),
            config: CreatureConfig,
        },
    ];
    const [activePanel, setActivePanel] = useState(0);

    function togglePanel(panel) {
        if (activePanel === panel) {
            setActivePanel(null);
        } else {
            setActivePanel(panel);
        }
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-bottom">
                <button className="navbar-toggler" type="button">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        {
                            panels.map((v, i) => {
                                return (
                                    <li
                                        ref={v.button}
                                        key={i}
                                        className={"nav-item " + (i === activePanel && "active")}
                                    >
                                        <a className="nav-link" href="#" onClick={togglePanel.bind(null, i)}>{v.label}</a>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            </nav>
            {activePanel !== null && (
                <ConfigWindow setGmOptions={setGmOptions} gmOptions={gmOptions} panel={panels[activePanel]} map={map}/>
            )}
        </>
    );
}