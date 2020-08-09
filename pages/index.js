import Head from 'next/head';
import Tv from "../components/Tv";

export default function IndexPage() {
    return (
        <>
            <Head>
                <title>Adventure</title>
                <link rel="icon" href="/favicon.ico"/>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
            </Head>

            <Tv/>
        </>
    );
}
