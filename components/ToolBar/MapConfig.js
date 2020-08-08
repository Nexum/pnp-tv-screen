import {useCallback, useEffect, useRef, useState} from "react";
import {debounce} from "lodash";
import ModifyForm from "./MapConfig/ModifyForm";
import NewForm from "./MapConfig/NewForm";
import DeleteForm from "./MapConfig/DeleteForm";
import SwitchForm from "./MapConfig/SwitchForm";
import ResetButton from "./FowConfig/ResetButton";

export default function MapConfig({map}) {

    async function resetFow() {
        await fetch(`/api/map/${map._id}/fow`, {
            method: "POST",
            body: JSON.stringify({
                fow: null,
            }),
        });
    }

    return (
        <div className="d-flex">
            {map && (
                <div className="mr-5">
                    <ModifyForm map={map}></ModifyForm>
                </div>
            )}
            <div className="mr-5">
                <SwitchForm map={map}></SwitchForm>
                <NewForm map={map}></NewForm>
            </div>
            {map && (
                <div>
                    <div className="mb-1">
                        <ResetButton map={map}></ResetButton>
                    </div>
                    <div>
                        <DeleteForm map={map}></DeleteForm>
                    </div>
                </div>
            )}
        </div>
    );
}