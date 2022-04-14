import { useLocation, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import useFetch from "./useFetch";
import Index from "./pages/Index";
import { DateTime } from "luxon";
import "./App.css";
import Graph from "./pages/Graph";
import { useEffect } from "react";

const App = () => {
    const url = localStorage.getItem("url") ?? "https://ritcoviddashboard.com/api/v0/history";

    let routerLocation = useLocation();
    useEffect(() => {
        !window.goatcounter ?? window.goatcounter.count({
            path: location.pathname + location.search + location.hash,
        });
    }, [routerLocation]);

    const response = useFetch(url);

    const [timeDifference, setTimeDifference] = useState(1);
    const local = DateTime.local().zoneName;

    let data = response.data ?? [];

    const latest = response.loading ? null : data[data.length - 1];
    const prior = response.loading ? null : data[data.length - (1 + timeDifference)];

    const lastUpdate = response.loading ? null : DateTime.fromSQL(latest.last_updated).setZone(local);
    const priorUpdate = response.loading ? null : DateTime.fromSQL(prior.last_updated).setZone(local);

    return (
        <div className="App">
            <header>
                <Link to="/">
                    <h1>RIT COVID Dashboard</h1>
                </Link>
                <Updated
                    loading={response.loading}
                    lastUpdate={lastUpdate}
                    priorUpdate={priorUpdate}
                    timeDifference={timeDifference}
                />
            </header>
            <Routes>
                <Route
                    path="/totalstudents"
                    element={
                        <Graph
                            name={"Total Student Cases"}
                            response={response}
                            dataKey={"total_students"}
                            timeDifference={timeDifference}
                        />
                    }
                ></Route>
                <Route
                    path="/totalstaff"
                    element={
                        <Graph
                            name={"Total Staff Cases"}
                            response={response}
                            dataKey={"total_staff"}
                            timeDifference={timeDifference}
                        />
                    }
                ></Route>
                <Route
                    path="/newstudents"
                    element={
                        <Graph
                            name={"New Student Cases"}
                            response={response}
                            dataKey={"new_students"}
                            timeDifference={timeDifference}
                        />
                    }
                ></Route>
                <Route
                    path="/newstaff"
                    element={
                        <Graph
                            name={"New Staff Cases"}
                            response={response}
                            dataKey={"new_staff"}
                            timeDifference={timeDifference}
                        />
                    }
                ></Route>
                <Route exact path="/" element={<Index response={response} timeDifference={timeDifference} />} />
            </Routes>
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
                <p>
                    <a className="BlueLink" href="https://galenguyer.com/projects/ritcoviddashboard">
                        API Documentation
                    </a>
                </p>
            </footer>
            <script data-goatcounter="https://rcd.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
        </div>
    );
};

const Updated = (props) => {
    const { loading, lastUpdate, priorUpdate, timeDifference } = props;
    if (loading) {
        return <div></div>;
    }

    return (
        <div className="Updated">
            <div className="Latest">
                Last Updated:{" "}
                {lastUpdate.toLocaleString({
                    weekday: "long",
                    month: "long",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                })}
            </div>
            <div className="Prior">
                Prior Update:{" "}
                {priorUpdate.toLocaleString({
                    weekday: "long",
                    month: "long",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                })}{" "}
                ({timeDifference == 1 ? "one weekday ago" : timeDifference == 5 ? "one week ago" : "two weeks ago"})
            </div>
        </div>
    );
};

export default App;
