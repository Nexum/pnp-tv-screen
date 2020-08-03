import {useState} from "react";

export default function NewMapForm({onClose, mapName}) {
    const initialData = {
        _id: "",
    };
    const [data, setData] = useState(initialData);

    function onInputChange(path, {currentTarget}) {
        setData({
            ...data,
            [path]: currentTarget.value,
        });
    }

    async function handeSubmit() {
        await fetch(`/api/map/${data._id}/save`, {
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    function onSubmit(e) {
        e.preventDefault();
        handeSubmit();
        return false;
    }

    return (
        <form onSubmit={onSubmit} className="map-form form p-2 panel mt-2">
            <h5>
                New Map
            </h5>
            <div className="form-group">
                <input type="text" className="form-control" value={data._id} onChange={onInputChange.bind(null, "_id")} placeholder="Map"/>
            </div>
            <div className="form-group d-flex">
                <button className="btn btn-success flex-fill">Save</button>
            </div>
        </form>
    );
}