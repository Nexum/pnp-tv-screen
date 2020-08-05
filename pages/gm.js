import Head from 'next/head';
import Screen from "../components/Screen";

export default function GameMasterPage() {
    return (
        <>
            <Head>
                <title>Game Master</title>
                <link rel="icon" href="/favicon.ico"/>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            </Head>

            <Screen isGm={true}/>
        </>
);
}
