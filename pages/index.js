import Head from 'next/head';
import Map from '../components/Map';
import SideBar from "../components/SideBar";
import CreatureSideBar from "../components/CreatureSideBar";

export default function IndexPage() {
    return (
        <div style={{height: "100vh"}}>
            <Head>
                <title>Adventure</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <div className="d-flex">
                <CreatureSideBar isGm={false}/>
                <Map className="flex-fill" isGm={false}/>
                <SideBar/>
            </div>
        </div>
    );
}
