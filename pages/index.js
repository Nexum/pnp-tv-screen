import Head from 'next/head';
import Screen from "../components/Screen";

export default function IndexPage() {
    return (
        <div style={{height: "100vh"}}>
            <Head>
                <title>Adventure</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <Screen isGm={false} />
        </div>
    );
}
