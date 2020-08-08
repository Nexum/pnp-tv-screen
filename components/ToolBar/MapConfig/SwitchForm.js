import {useCallback, useEffect, useRef, useState} from "react";
import {debounce} from "lodash";
import useSocket from "../../../hooks/useSocket";

export default function SwitchForm({map}) {
    const [maps, setMaps] = useState([]);

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

    async function switchMap(e) {
        await fetch(`/api/map/${e.target.value}/activate`, {
            method: "POST",
        });
    }

    if (!maps || !maps.length) {
        return null;
    }

    return (
        <div className="form-group">
            <label htmlFor="modify-name">Switch map</label>
            <select className="custom-select" onChange={switchMap} value={map ? map._id : ""}>
                {maps.map((v, i) => {
                    return <option key={i} value={v._id}>{v.name}</option>;
                })}
            </select>
        </div>
    );
}