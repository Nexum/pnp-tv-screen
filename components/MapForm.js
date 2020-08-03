import {useCallback, useRef, useState} from "react";
import {Stage, Layer, Image} from 'react-konva';
import useSocket from "../hooks/useSocket";
import ControlPanelFormContainer from "./ControlPanelFormContainer";

export default function MapForm({onClose}) {

    function onFileSelected(e) {
        const data = new FormData();
        data.append("file", e.target.files[0]);
        fetch("/api/file/map/upload", {
            method: "POST",
            body: data,
        });
    }

    return (
        <ControlPanelFormContainer onClose={onClose}>
            <div className="p-2">
                <h4>Change Map File</h4>
                <input type="file" onChange={onFileSelected.bind(this)}/>
            </div>
        </ControlPanelFormContainer>
    );
}