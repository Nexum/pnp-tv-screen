import {useCallback, useState} from "react";
import {Stage, Layer, Image} from 'react-konva';
import useSocket from "../hooks/useSocket";

export default function Map({isGm}) {
    const [imageLoadTimestamp, setImageLoad] = useState(Date.now());

    useSocket("mapChanged", () => {
        setImageLoad(Date.now());
    });

    function onFileSelected(e) {
        const data = new FormData();
        data.append("file", e.target.files[0]);
        fetch("/api/upload", {
            method: "POST",
            body: data,
        });
    }

    return (
        <div className="map">
            {isGm && (
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <span className="nav-link"><input type="file" onChange={onFileSelected.bind(this)}/></span>
                        </li>
                    </ul>
                </nav>
            )}

            <img src={"/api/file/map/png?loadTimestamp=" + imageLoadTimestamp} className="background-image"/>
        </div>
    );
}