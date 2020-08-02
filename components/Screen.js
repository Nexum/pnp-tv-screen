import CreatureSideBar from "./CreatureSideBar";
import Map from "./Map";
import SideBar from "./SideBar";


export default function Screen({isGm}) {
    return (
        <div className="d-flex justify-content-center">
            <CreatureSideBar isGm={isGm}/>
            <Map className="flex-fill" isGm={isGm}/>
            <SideBar isGm={isGm}/>
        </div>
    );
}