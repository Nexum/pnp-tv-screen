import {useCallback, useEffect, useRef, useState} from "react";
import {debounce} from "lodash";

export default function NewForm({}) {
    const [values, setValues] = useState({
        name: "",
    });

    function onSubmit(e) {
        handeSubmit();
        e.preventDefault();
        return false;
    }

    function onInputChange(path, {currentTarget}) {
        setValues({
            ...values,
            [path]: currentTarget.value,
        });
    }

    async function handeSubmit() {
        await fetch(`/api/map/create`, {
            method: "POST",
            body: JSON.stringify(values),
        });
    }

    return (
        <form onSubmit={onSubmit} className="">
            <div className="form-group">
                <label htmlFor="new-name">Create new map</label>
                <input type="text" id="new-name" value={values.name} name="name" onChange={onInputChange.bind(null, "name")} className="form-control"/>
            </div>
            <button type="submit" className="btn btn-primary">Create</button>
        </form>
    );
}