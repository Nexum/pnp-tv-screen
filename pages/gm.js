import Head from 'next/head';
import Map from '../components/Map';
import SideBar from "../components/SideBar";
import CreatureSideBar from "../components/CreatureSideBar";

export default function GameMasterPage() {
    return (
        <div style={{height: "100vh"}}>
            <Head>
                <title>Game Master</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <div className="d-flex">
                <CreatureSideBar isGm={true}/>
                <Map isGm={true}/>
                <SideBar></SideBar>
            </div>
        </div>
    );
}
