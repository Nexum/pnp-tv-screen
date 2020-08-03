import '../src/App.scss';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

export default function MyApp({Component, pageProps}) {
    return (
        <DndProvider backend={HTML5Backend}>
            <Component {...pageProps} />
        </DndProvider>
    );
}