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
        <form onSubmit={onSubmit} className="creature-form form">
            <input type="text" className="form-control" value={data.name} onChange={onInputChange.bind(null, "name")} placeholder="New Creature"/>
            <input type="number" className="form-control" onChange={onInputChange.bind(null, "health")} value={data.health}/>
            <button className="btn btn-success">Save</button>
        </form>
    );
}