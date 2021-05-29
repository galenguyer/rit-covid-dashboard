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
    let { data: rawData, error: error } = useSWR(url);

    const [timeDifference, setTimeDifference] = React.useState(1);
    const [showAllTime, setShowAllTime] = React.useState(false);

    if (error)
        return (
            <div className="App">
                <h1>RIT Covid Dashboard</h1>
                <h2>An error occurred</h2>
            </div>
        );
    if (!rawData)
        return (
            <div className="App">
                <h1>RIT Covid Dashboard</h1>
                <h2>Loading latest data...</h2>
            </div>
        );

    rawData = rawData.slice(0, 177);
    let data = rawData;
    console.log(data.length);
    const local = DateTime.local().zoneName;
    const semesterStart = DateTime.fromISO("2021-01-01");
    if (!showAllTime) {
        data = rawData.filter((d) => {
            let date = DateTime.fromSQL(d.last_updated, { zone: "UTC" }).setZone(local);
            return date > semesterStart;
        });
        const last = rawData[rawData.length - data.length - 1];
        data = data.map((d) => {
            return {
                alert_level: d.alert_level,
                beds_available: d.beds_available,
                isolation_off_campus: d.isolation_off_campus,
                isolation_on_campus: d.isolation_on_campus,
                last_updated: d.last_updated,
                new_staff: d.new_staff,
                new_students: d.new_students,
                quarantine_off_campus: d.quarantine_off_campus,
                quarantine_on_campus: d.quarantine_on_campus,
                tests_administered: d.tests_administered - last.tests_administered,
                total_staff: d.total_staff - last.total_staff,
                total_students: d.total_students - last.total_students,
            };
        });
    }

    const latest = data[data.length - 1];
    const prior = data[data.length - (1 + timeDifference)];
    const lastUpdate = DateTime.fromSQL(latest.last_updated, { zone: "UTC" }).setZone(local);
    const priorUpdate = DateTime.fromSQL(prior.last_updated, { zone: "UTC" }).setZone(local);
    let positiveCases = [];
    for (let i = 5; i < data.length; i++) {
        positiveCases.push({
            date: data[i].last_updated,
            value: (
                ((data[i].total_students - data[i - 5].total_students) * 100) /
                (data[i].tests_administered - data[i - 5].tests_administered)
            ).toFixed(1),
        });
    }
    positiveCases = positiveCases.filter((o) => o.value > 0 && o.value <= 100);
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
                    })}{" "}
                    ({timeDifference == 1 ? "one day ago" : timeDifference == 5 ? "one week ago" : "two weeks ago"})
                </h4>
                <button
                    onClick={() => setTimeDifference(timeDifference == 1 ? 5 : timeDifference == 5 ? 10 : 1)}
                    className="bg-transparent text-sm hover:bg-orange-400 text-gray-600 hover:text-white py-1 my-1 px-2 border border-orange-300 hover:border-transparent rounded transition ease-in-out duration-300"
                >
                    Use {timeDifference == 10 ? "one day" : timeDifference == 5 ? "two weeks" : "one week"} ago
                </button>
                &nbsp;
                <button
                    onClick={() => setShowAllTime(showAllTime ? false : true)}
                    className="bg-transparent text-sm hover:bg-orange-400 text-gray-600 hover:text-white py-1 my-1 px-2 border border-orange-300 hover:border-transparent rounded transition ease-in-out duration-300"
                >
                    Show {showAllTime ? "current semester" : "all time"}
                </button>
                <br />
                <Switch>
                    <Route exact path="/">
                        <MainPage data={data} timeDifference={timeDifference} showAllTime={showAllTime} />
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
                        <History name="Positive Test Rate (Over One Week)" data={positiveCases} />
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
                <p>
                    <a className="text-blue-700" href="https://galenguyer.com/projects/ritcoviddashboard">
                        API Documentation
                    </a>
                </p>
            </div>
        </BrowserRouter>
    );
}

export default App;
