import {useCallback, useEffect, useRef, useState} from "react";
import useSocket from "../hooks/useSocket";
import ControlPanelFormContainer from "./ControlPanelFormContainer";
import {Dropdown, DropdownButton, Button} from "react-bootstrap";
import NewMapForm from "./NewMapForm";

export default function MapForm({onClose, map}) {
    const [maps, setMaps] = useState([]);

    async function getData() {
        const data = await fetch("/api/map/find", {
            method: "GET",
        });

        setMaps(await data.json());
    }

    useEffect(() => {
        getData();
    }, []);

    useSocket("map.created", () => {
        getData();
    });
    useSocket("map.deleted", () => {
        getData();
    });

    function onFileSelected(e) {
        const data = new FormData();
        data.append("file", e.target.files[0]);
        fetch(`/api/file/${map._id}/upload`, {
            method: "POST",
            body: data,
        });
    }

    async function setMap(_id) {
        await fetch(`/api/map/${_id}/activate`, {
            method: "POST",
        });
    }

    return (
        <ControlPanelFormContainer onClose={onClose}>
            <div className="p-2">
                <DropdownButton title="Select Map">
                    {maps.map((v, i) => {
                        return <Dropdown.Item key={i} active={v._id === map._id} onClick={setMap.bind(null, v._id)}>{v._id}</Dropdown.Item>;
                    })}
                </DropdownButton>
            </div>
            <div className="p-2">
                <h4>Change {map._id}</h4>
                <input type="file" onChange={onFileSelected}/>
            </div>
            <NewMapForm/>
        </ControlPanelFormContainer>
    );
}