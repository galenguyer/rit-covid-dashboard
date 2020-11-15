import useSWR from "swr";
import { DateTime } from "luxon";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import MainPage from "./MainPage";
import History from "./History";
import "./App.css";

const url = "https://ritcoviddashboard.com/api/v0/history";

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
                <h1 className="text-4xl"><Link to="/">RIT Covid Dashboard</Link></h1>
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
                    <Route path="/totalstaff">
                        <History
                            name="Total Staff Cases"
                            data={data.map((d) => {
                                return { value: d.total_staff, date: d.last_updated };
                            })}
                        />
                    </Route>
                    <Route path="/newstudents">
                        <History
                            name="New Student Cases"
                            data={data.map((d) => {
                                return { value: d.new_students, date: d.last_updated };
                            })}
                        />
                    </Route>
                    <Route path="/newstaff">
                        <History
                            name="New Staff Cases"
                            data={data.map((d) => {
                                return { value: d.new_staff, date: d.last_updated };
                            })}
                        />
                    </Route>
                    <Route path="/quarantineoncampus">
                        <History
                            name="Quarantine On Campus"
                            data={data.map((d) => {
                                return { value: d.quarantine_on_campus, date: d.last_updated };
                            })}
                        />
                    </Route>
                    <Route path="/quarantineoffcampus">
                        <History
                            name="Quarantine Off Campus"
                            data={data.map((d) => {
                                return { value: d.quarantine_off_campus, date: d.last_updated };
                            })}
                        />
                    </Route>

                    <Route path="/isolationoncampus">
                        <History
                            name="Isolation On Campus"
                            data={data.map((d) => {
                                return { value: d.isolation_on_campus, date: d.last_updated };
                            })}
                        />
                    </Route>
                    <Route path="/isolationoffcampus">
                        <History
                            name="Isolation Off Campus"
                            data={data.map((d) => {
                                return { value: d.isolation_off_campus, date: d.last_updated };
                            })}
                        />
                    </Route>
                    <Route path="/tests">
                        <History
                            name="Tests Administered"
                            data={data.map((d) => {
                                return { value: d.tests_administered, date: d.last_updated };
                            })}
                        />
                    </Route>
                    <Route path="/beds">
                        <History
                            name="Bed Availability"
                            data={data.map((d) => {
                                return { value: d.beds_available, date: d.last_updated };
                            })}
                        />
                    </Route>
                </Switch>
                <br />
                <p>
                    By Galen Guyer. Source available on{" "}
                    <a className="text-blue-700" href="https://github.com/galenguyer/rit-covid-dashboard">
                        GitHub
                    </a>
                </p>
            </div>
        </BrowserRouter>
    );
}

export default App;
