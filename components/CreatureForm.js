import {useEffect, useState} from "react";

let lastId = 0;

export default function CreatureForm() {
    const initialData = {
        _id: "new",
        health: 10,
        name: "",
    };
    const [data, setData] = useState(initialData);

    function onInputChange(path, {currentTarget}) {
        setData({
            ...data,
            [path]: currentTarget.value,
        });
    }

    async function handeSubmit() {
        await fetch(`/api/creature/${data._id}/save`, {
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
        <form onSubmit={onSubmit} className="creature-form form p-2 panel mt-2">
            <h5>
                New Creature
            </h5>
            <div className="form-group">
                <input type="text" className="form-control" value={data.name} onChange={onInputChange.bind(null, "name")} placeholder="Creature name"/>
            </div>
            <div className="form-group">
                <input type="number" className="form-control" onChange={onInputChange.bind(null, "health")} value={data.health}/>
            </div>
            <div className="form-group d-flex">
                <button className="btn btn-success flex-fill">Save</button>
            </div>
        </form>
    );
}