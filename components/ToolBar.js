import {useEffect, useRef, useState} from "react";
import FowConfig from "./ToolBar/FowConfig";
import ConfigWindow from "./ToolBar/ConfigWindow";
import MapConfig from "./ToolBar/MapConfig";
import CreatureConfig from "./ToolBar/CreatureConfig";
import PaintConfig from "./ToolBar/PaintConfig";

export default function ControlPanel({map, setGmOptions, gmOptions}) {
    const panels = [
        {
            label: "FOW",
            layer: "fow",
            config: FowConfig,
            button: useRef(),
        },
        {
            label: "Paint",
            layer: "marker",
            config: PaintConfig,
            button: useRef(),
        },
        {
            label: "Maps",
            layer: "map",
            config: MapConfig,
            button: useRef(),
        },
        {
            label: "Creatures",
            layer: "creature",
            button: useRef(),
            config: CreatureConfig,
        },
    ];
    const [activePanel, setActivePanel] = useState(null);

    function togglePanel(panel) {

        if (activePanel === panel) {
            setGmOptions({
                activeLayer: null,
            });
            setActivePanel(null);
        } else {
            setGmOptions({
                activeLayer: panels[panel].layer,
            });
            setActivePanel(panel);
        }
    }

    /*
    useEffect(() => {
        togglePanel(1);
    }, []);
     */

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