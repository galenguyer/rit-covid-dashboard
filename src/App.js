import useSWR from "swr";
import Card from "./Card";
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

    const latest = data[data.length - 1];
    const prior = data[data.length - 2];

    return (
        <div className="App">
            <h1>RIT Covid Dashboard</h1>
            <div className="Section">
                <Card name="Total Student Cases" latest={latest.total_students} prior={prior.total_students} />
                <Card name="Total Staff Cases" latest={latest.total_staff} prior={prior.total_staff} />
            </div>
        </div>
    );
}

export default App;
