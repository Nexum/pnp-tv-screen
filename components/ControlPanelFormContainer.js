import {useState} from "react";
import {useDrag} from "react-dnd";

export default function ControlPanelFormContainer({children}) {
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
            {children}
        </div>
    );
}