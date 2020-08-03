import {useCallback, useRef, useState} from "react";
import {Stage, Layer, Image} from 'react-konva';
import useSocket from "../hooks/useSocket";

export default function Map({className, isGm, onLoad}) {
    const [imageLoadTimestamp, setImageLoad] = useState();
    const mapRef = useRef();
    const containerRef = useRef();

    useSocket("file.map.changed", () => {
        setImageLoad(Date.now());
    });

    function onFileSelected(e) {
        const data = new FormData();
        data.append("file", e.target.files[0]);
        fetch("/api/file/map/upload", {
            method: "POST",
            body: data,
        });
    }

    function handleMapLoad(e) {
        if (onLoad) {
            onLoad(mapRef.current.clientWidth, containerRef.current.clientWidth);
        }
    }

    return (
        <div className={(className || "") + " map d-flex align-content-center justify-content-center"} ref={containerRef}>
            {isGm && (
                <nav className="navbar navbar-dark bg-dark">
                    <ul className="navbar-nav ">
                        <li className="nav-item">
                            <span className="nav-link"><input type="file" onChange={onFileSelected.bind(this)}/></span>
                        </li>
                    </ul>
                </nav>
            )}

            <div className="background-image">
                <img ref={mapRef} onLoad={handleMapLoad} src={"/api/file/map/png?loadTimestamp=" + imageLoadTimestamp}/>
            </div>
        </div>
    );
}