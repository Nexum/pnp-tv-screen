import Head from 'next/head';
import Screen from "../components/Screen";

export default function GameMasterPage() {
    return (
        <div style={{height: "100vh"}}>
            <Head>
                <title>Game Master</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <Screen isGm={true}/>
        </div>
    );
}
