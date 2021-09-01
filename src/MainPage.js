import React from "react";
import Card from "./Card";
import GoatCounter from "./GoatCounter";

const MainPage = (props) => {
    const data = props.data;
    const latest = data[data.length - 1];
    const prior = data[data.length - (1 + props.timeDifference)];
    // const priorPrior = data[Math.max(0, data.length - (1 + props.timeDifference * 2))];

    // const positiveTestRate = Math.max(
    //     0,
    //     Math.min(
    //         100,
    //         ((latest.total_students - prior.total_students) * 100) /
    //             (latest.tests_administered - prior.tests_administered)
    //     )
    // ).toFixed(1);
    // const priorPositiveTestRate = Math.max(
    //     0,
    //     Math.min(
    //         100,
    //         ((prior.total_students - priorPrior.total_students) * 100) /
    //             (prior.tests_administered - priorPrior.tests_administered)
    //     )
    // ).toFixed(1);

    return (
        <>
            {/* <h4 className="text-2xl">
                Alert Level: {latest.alert_level.charAt(0).toUpperCase() + latest.alert_level.slice(1)}
            </h4>
            <h5 className="text-gray-600 text-sm">
                (Prior Alert Level: {prior.alert_level.charAt(0).toUpperCase() + prior.alert_level.slice(1)})
            </h5>
            <br /> */}
            <h2 className="text-xl">
                This dashboard has been refreshed for the new school year. For historical data, please contact
                me at gkg1648 [AT] rit [DOT] edu. More cards and features will be re-added if they are added to
                the official dashboard.
            </h2>
            <br />
            <div id="total">
                <h4 className="text-2xl">
                    {/* Total Positive Cases Since {props.showAllTime ? "August 19 (First Day of Classes)" : "January 1"} */}
                    Total Positive Cases Since August 16 (First Day of Move-In)
                </h4>
                <div className="Section">
                    <Card
                        name="Students"
                        latest={latest.total_students}
                        diff={latest.total_students - prior.total_students}
                        link="/totalstudents"
                    />
                    <Card
                        name="Staff"
                        latest={latest.total_staff}
                        diff={latest.total_staff - prior.total_staff}
                        link="/totalstaff"
                    />
                </div>
            </div>
            <br />
            <div id="new">
                <h4 className="text-2xl">New Positive Cases From Past 14 Days</h4>
                <div className="Section">
                    <Card
                        name="Students"
                        latest={latest.new_students}
                        diff={latest.new_students - prior.new_students}
                        link="/newstudents"
                    />
                    <Card
                        name="Staff"
                        latest={latest.new_staff}
                        diff={latest.new_staff - prior.new_staff}
                        link="/newstaff"
                    />
                </div>
            </div>
            {/* <br />
            <div id="quarantine">
                <h4 className="text-2xl">Number of Students in Quarantine</h4>
                <h5 className="text-base">
                    Quarantine separates and restricts the movement of people who were exposed to a contagious disease
                    to see if they become sick.
                </h5>
                <div className="Section">
                    <Card
                        name="On Campus"
                        latest={latest.quarantine_on_campus}
                        diff={latest.quarantine_on_campus - prior.quarantine_on_campus}
                        link="/quarantineoncampus"
                    />
                    <Card
                        name="Off Campus"
                        latest={latest.quarantine_off_campus}
                        diff={latest.quarantine_off_campus - prior.quarantine_off_campus}
                        link="/quarantineoffcampus"
                    />
                </div>
            </div>
            <br />
            <div id="isolation">
                <h4 className="text-2xl">Number of Students in Isolation</h4>
                <h5 className="text-base">
                    Isolation separates sick people with a contagious disease from people who are not sick.
                </h5>
                <div className="Section">
                    <Card
                        name="On Campus"
                        latest={latest.isolation_on_campus}
                        diff={latest.isolation_on_campus - prior.isolation_on_campus}
                        link="isolationoncampus"
                    />
                    <Card
                        name="Off Campus"
                        latest={latest.isolation_off_campus}
                        diff={latest.isolation_off_campus - prior.isolation_off_campus}
                        link="isolationoffcampus"
                    />
                </div>
            </div>
            <br />
            <div id="tests">
                <h4 className="text-2xl">Tests</h4>
                <h5 className="text-base">
                    Positive Test Rate is calculated using the difference in total cases divided by the difference in
                    tests administed for the selected time frame (one day or one week). The daily positive test rate
                    fluctuates wildly and should be taken with caution, while the weekly positive test rate is far more
                    stable and useful.
                </h5>
                <div className="Section">
                    <Card
                        name="Tests Administered"
                        latest={latest.tests_administered}
                        diff={latest.tests_administered - prior.tests_administered}
                        link="/tests"
                    />
                    <Card
                        name="Positive Test Rate"
                        latest={positiveTestRate + "%"}
                        diff={(positiveTestRate - priorPositiveTestRate).toFixed(1) + "%"}
                        link="/positivetests"
                    />
                </div>
            </div>
            <br />
            <div id="beds">
                <h4 className="text-2xl">Quarantine/Isolation Bed Availability On-campus</h4>
                <div className="Section">
                    <Card
                        name="Beds Available"
                        latest={latest.beds_available + "%"}
                        diff={latest.beds_available - prior.beds_available + "%"}
                        suffix="%"
                        link="/beds"
                    />
                </div>
            </div> */}
            <GoatCounter />
        </>
    );
};

export default MainPage;
