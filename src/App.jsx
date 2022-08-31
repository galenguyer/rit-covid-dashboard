import { Link } from "react-router-dom";
import "./App.css";
import Index from "./pages/Index";

const App = () => {
    return (
        <div className="App">
            <header>
                <Link to="/">
                    <h1>RIT COVID Dashboard</h1>
                </Link>
            </header>
            <Index />
            <footer>
                <p>
                    By Galen Guyer. Source available on{" "}
                    <a className="BlueLink" href="https://github.com/galenguyer/rit-covid-dashboard">
                        GitHub
                    </a>{" "}
                    (
                    <a className="BlueLink" href="https://github.com/galenguyer/rit-covid-dashboard/issues">
                        Report Issue
                    </a>
                    )
                </p>
            </footer>
            <script data-goatcounter="https://rcd.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
        </div>
    );
};

export default App;
