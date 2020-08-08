import {useCallback, useEffect, useRef, useState} from "react";
import {debounce} from "lodash";

export default function DeleteForm({map}) {
    async function deleteCurrentMap() {
        if (confirm("Are you sure?")) {
            await fetch(`/api/map/${map._id}/delete`, {
                method: "POST",
            });
        }
    }

    if (!map || !map._id) {
        return null;
    }

    return (
        <button type="submit" className="btn btn-danger" onClick={deleteCurrentMap}>Delete current map</button>
    );
}