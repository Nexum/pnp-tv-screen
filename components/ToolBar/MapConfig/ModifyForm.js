import {useCallback, useEffect, useRef, useState} from "react";
import {debounce} from "lodash";
import useSocket from "../../../hooks/useSocket";

export default function ModifyForm({map}) {
    const [values, setValues] = useState({
        ...map,
    });
    const [maps, setMaps] = useState([]);

    useEffect(() => {
        setValues({
            ...map,
        });
    }, [map]);

    async function getMaps() {
        const data = await fetch("/api/map/find", {
            method: "GET",
        });

        setMaps(await data.json());
    }

    useEffect(() => {
        getMaps();
    }, []);

    useSocket("map.created", () => {
        getMaps();
    });
    useSocket("map.deleted", () => {
        getMaps();
    });

    function onRename({target}) {
        setValues({
            ...values,
            name: target.value,
        });
    }

    function onFileSelected(e) {
        const data = new FormData();
        data.append("file", e.target.files[0]);
        fetch(`/api/file/${map._id}/upload`, {
            method: "POST",
            body: data,
        });
    }

    function onSubmit(e) {
        handleSubmit();
        e.preventDefault();
        return false;
    }

    async function handleSubmit() {
        await fetch(`/api/map/${values._id}/save`, {
            method: "POST",
            body: JSON.stringify({
                name: values.name,
            }),
        });
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="modify-name">Change name</label>
                <input type="text" id="modify-name" value={values.name} name="name" onChange={onRename} className="form-control"/>
            </div>
            <div className="form-group">
                <div className="custom-file">
                    <input className="custom-file-input" type="file" onChange={onFileSelected}/>
                    <label htmlFor="modify-name" className="custom-file-label">Choose file</label>
                </div>
            </div>
            <button type="submit" className="btn btn-primary">Update</button>
        </form>
    );
}