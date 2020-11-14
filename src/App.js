import useSWR from "swr";
import logo from "./logo.svg";
import "./App.css";

const url = "https://rcpoller.galenguyer.com/api/v0/history";

function App() {
    const { data: data, error: error } = useSWR(url);

    if (error)
        return (
            <div className="App">
                <h1>RIT Covid Dashboard</h1>
                <h2>An error occurred</h2>
            </div>
        );
    if (!data)
        return (
            <div className="App">
                <h1>RIT Covid Dashboard</h1>
                <h2>Loading latest data...</h2>
            </div>
        );

    return (
        <div className="App">
            <h1>RIT Covid Dashboard</h1>
            <h2>Data Loaded</h2>
        </div>
    );
}

export default App;
