import useSWR from "swr";
import { DateTime } from "luxon";
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
    const local = DateTime.local().zoneName;
    const lastUpdate = DateTime.fromSQL(latest.last_updated, { zone: "UTC" }).setZone(local);

    return (
        <div className="App">
            <h1>RIT Covid Dashboard</h1>
            <h3>
                Last Updated:{" "}
                {lastUpdate.toLocaleString({
                    weekday: "long",
                    month: "long",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                })}
            </h3>
            <div className="Section">
                <Card name="Total Student Cases" latest={latest.total_students} prior={prior.total_students} />
                <Card name="Total Staff Cases" latest={latest.total_staff} prior={prior.total_staff} />
            </div>
            <div className="Section">
                <Card name="New Student Cases" latest={latest.new_students} prior={prior.new_students} />
                <Card name="New Staff Cases" latest={latest.new_staff} prior={prior.new_staff} />
            </div>
            <div className="Section">
                <Card
                    name="Quarantine On Campus"
                    latest={latest.quarantine_on_campus}
                    prior={prior.quarantine_on_campus}
                />
                <Card
                    name="Quarantine Off Campus"
                    latest={latest.quarantine_off_campus}
                    prior={prior.quarantine_off_campus}
                />
            </div>
            <div className="Section">
                <Card
                    name="Isolation On Campus"
                    latest={latest.isolation_on_campus}
                    prior={prior.isolation_on_campus}
                />
                <Card
                    name="Isolation Off Campus"
                    latest={latest.isolation_off_campus}
                    prior={prior.isolation_off_campus}
                />
            </div>
            <div className="Section">
                <Card name="Tests Administered" latest={latest.tests_administered} prior={prior.tests_administered} />
            </div>
            <div className="Section">
                <Card name="Beds Available" latest={latest.beds_available} prior={prior.beds_available} suffix="%" />
            </div>
        </div>
    );
}

export default App;
