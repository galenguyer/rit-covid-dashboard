import useSWR from "swr";
import { DateTime } from "luxon";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainPage from "./MainPage";
import History from "./History";
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
        <BrowserRouter>
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
                <Switch>
                    <Route exact path="/">
                        <MainPage latest={latest} prior={prior} />{" "}
                    </Route>
                    <Route path="/totalstudents">
                        <History
                            name="Total Student Cases"
                            data={data.map((d) => {
                                return { value: d.total_students, date: d.last_updated };
                            })}
                        />
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
