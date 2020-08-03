import Head from 'next/head';
import Screen from "../components/Screen";

export default function GameMasterPage() {
    return (
        <div>
            <Head>
                <title>Game Master</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <Screen isGm={true}/>
        </div>
    );
}
