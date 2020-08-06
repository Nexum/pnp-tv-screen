import {useState} from "react";
import {useDrag} from "react-dnd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

export default function FormContainer({children, onClose}) {
    const [pos, setPos] = useState({x: 80, y: 0});
    const [{isDragging}, drag] = useDrag({
        item: {
            _id: "creature-form",
            pos: pos,
            type: "form",
            callback: (pos) => {
                setPos(pos);
            },
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    if (isDragging) {
        return <div ref={drag}/>;
    }

    return (
        <div className="control-panel-form" ref={drag} style={{
            left: pos.x + "%",
            top: pos.y + "%",
        }}>
            <button className="btn btn-danger btn-sm close-btn" onClick={onClose}><FontAwesomeIcon icon={faTimes}></FontAwesomeIcon></button>
            {children}
        </div>
    );
}