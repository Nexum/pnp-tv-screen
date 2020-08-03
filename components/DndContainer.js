import {useDrop} from "react-dnd";


export default function DndContainer({className, children, factor}) {

    async function setCreaturePos(_id, pos) {
        await fetch(`/api/creature/${_id}/save`, {
            method: "POST",
            body: JSON.stringify({
                pos: pos,
            }),
        });
    }

    const [, drop] = useDrop({
        accept: ["creature", "form"],
        drop(item, monitor) {
            const delta = monitor.getDifferenceFromInitialOffset();

            const percentageDeltaX = (delta.x / (1280 * factor)) * 100;
            const percentageDeltaY = (delta.y / (720 * factor)) * 100;

            const x = item.pos.x + percentageDeltaX;
            const y = item.pos.y + percentageDeltaY;

            if (item.type === "creature") {
                setCreaturePos(item._id, {
                    x,
                    y,
                });
            }

            if (typeof item.callback === "function") {
                item.callback({
                    x, y,
                });
            }

            return undefined;
        },
    });

    return (
        <div ref={drop} className={"dnd-container " + className}>
            {children}
        </div>
    );
}