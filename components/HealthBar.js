import {ProgressBar} from "react-bootstrap";

export default function HealthBar({className, current, health, label}) {
    const percentage = Math.round(((1 / health) * current) * 100);

    return (
        <div className={(className || "") + " health-bar"}>
            <ProgressBar className="" now={percentage} label={label + ` ${percentage}%`}/>
        </div>
    );

}