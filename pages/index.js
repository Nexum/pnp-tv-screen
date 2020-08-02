import Head from 'next/head';
import Map from '../components/Map';

export default function ScreenPage() {
    return (
        <div className="container-fluid" style={{height: "100vh"}}>
            <Head>
                <title>Adventure</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <Map isGm={false}/>
        </div>
    );
}
