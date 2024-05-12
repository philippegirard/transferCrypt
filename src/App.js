import './App.css';
import {LandingPage} from './LandingPage';
import {AlchemyProvider} from "./AlchemyProvider";
import './style.css'

function App() {
    return (
        <div className="App">
            <AlchemyProvider>
                <LandingPage/>
            </AlchemyProvider>

            <div id="turnkey-iframe-container" className="turnkey-frame"/>
        </div>
    );
}

export default App;
