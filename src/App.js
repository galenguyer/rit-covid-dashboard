import React from "react";
import useSWR from "swr";
import { DateTime } from "luxon";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import MainPage from "./MainPage";
import History from "./History";
import HistoryTable from "./HistoryTable";
import "./App.css";

const url = "https://ritcoviddashboard.com/api/v0/history";

function App() {
    const { data: data, error: error } = useSWR(url);

    const [timeDifference, setTimeDifference] = React.useState(1);

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
    const prior = data[data.length - (1 + timeDifference)];
    const local = DateTime.local().zoneName;
    const lastUpdate = DateTime.fromSQL(latest.last_updated, { zone: "UTC" }).setZone(local);
    const priorUpdate = DateTime.fromSQL(prior.last_updated, { zone: "UTC" }).setZone(local);
    let positiveCases = [];
    for (let i = 1; i < data.length; i++) {
        positiveCases.push({
            date: data[i].last_updated,
            value: (
                ((data[i].total_students - data[i - 1].total_students) * 100) /
                (data[i].tests_administered - data[i - 1].tests_administered)
            ).toFixed(1),
        });
    }
    positiveCases = positiveCases.filter((o) => o.value > 0 && o.value <= 100);
    console.log(positiveCases);
    return (
        <BrowserRouter>
            <div className="App">
                <h1 className="text-4xl">
                    <Link to="/">RIT Covid Dashboard</Link>
                </h1>
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
                <h4 className="text-sm text-gray-600">
                    Prior Update:{" "}
                    {priorUpdate.toLocaleString({
                        weekday: "long",
                        month: "long",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </h4>

                <button
                    onClick={() => setTimeDifference(timeDifference == 1 ? 5 : 1)}
                    className="bg-transparent text-sm hover:bg-orange-400 text-gray-600 hover:text-white py-1 my-1 px-2 border border-orange-300 hover:border-transparent rounded transition ease-in-out duration-300"
                >
                    Use one {timeDifference == 1 ? "week" : "day"} ago
                </button>
                <br />
                <Switch>
                    <Route exact path="/">
                        <MainPage data={data} timeDifference={timeDifference} />
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
                    <Route path="/positivetests">
                        <HistoryTable name="Positive Tests" data={positiveCases} />
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
                    </a>{" "}
                    (
                    <a className="text-blue-700" href="https://github.com/galenguyer/rit-covid-dashboard/issues">
                        Report Issue
                    </a>
                    )
                </p>
            </div>
        </BrowserRouter>
    );
}

export default App;
