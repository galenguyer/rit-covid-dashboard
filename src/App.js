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
            <h1 className="text-4xl">RIT Covid Dashboard</h1>
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
            <br />
            <br />
            <div id="total">
                <h4 className="text-2xl">Total Positive Cases Since August 19 (First Day of Classes)</h4>
                <div className="Section">
                    <Card name="Students" latest={latest.total_students} prior={prior.total_students} />
                    <Card name="Staff" latest={latest.total_staff} prior={prior.total_staff} />
                </div>
            </div>
            <br />
            <div id="new">
                <h4 className="text-2xl">New Positive Cases From Past 14 Days</h4>

                <div className="Section">
                    <Card name="Students" latest={latest.new_students} prior={prior.new_students} />
                    <Card name="Staff" latest={latest.new_staff} prior={prior.new_staff} />
                </div>
            </div>
            <br />
            <div id="quarantine">
                <h4 className="text-2xl">Number of Students in Quarantine</h4>
                <h5 className="text-base">
                    Quarantine separates and restricts the movement of people who were exposed to a contagious disease
                    to see if they become sick.
                </h5>
                <div className="Section">
                    <Card name="On Campus" latest={latest.quarantine_on_campus} prior={prior.quarantine_on_campus} />
                    <Card name="Off Campus" latest={latest.quarantine_off_campus} prior={prior.quarantine_off_campus} />
                </div>
            </div>
            <br />
            <div id="isolation">
                <h4 className="text-2xl">Number of Students in Isolation</h4>
                <h5 className="text-base">
                    Isolation separates sick people with a contagious disease from people who are not sick.
                </h5>
                <div className="Section">
                    <Card name="On Campus" latest={latest.isolation_on_campus} prior={prior.isolation_on_campus} />
                    <Card name="Off Campus" latest={latest.isolation_off_campus} prior={prior.isolation_off_campus} />
                </div>
            </div>
            <br />
            <div id="tests">
                <h4 className="text-2xl">Number of Tests Administered by Student Health Center</h4>
                <div className="Section">
                    <Card name="Tests to date" latest={latest.tests_administered} prior={prior.tests_administered} />
                </div>
            </div>
            <br />
            <div id="beds">
                <h4 className="text-2xl">Quarantine/Isolation Bed Availability On-campus</h4>
                <div className="Section">
                    <Card
                        name="Beds Available"
                        latest={latest.beds_available}
                        prior={prior.beds_available}
                        suffix="%"
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
