import Head from 'next/head';
import Map from '../components/Map';

export default function GameMasterPage() {
    return (
        <div className="container-fluid" style={{height: "100vh"}}>
            <Head>
                <title>Game Master</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <Map isGm={true}/>
        </div>
    );
}
