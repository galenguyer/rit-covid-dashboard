import React from "react";
import Card from "./Card";

const MainPage = (props) => {
    const latest = props.latest;
    const prior = props.prior;

    return (
        <>
            <div id="total">
                <h4 className="text-2xl">Total Positive Cases Since August 19 (First Day of Classes)</h4>
                <div className="Section">
                    <Card
                        name="Students"
                        latest={latest.total_students}
                        prior={prior.total_students}
                        link="/totalstudents"
                    />
                    <Card name="Staff" latest={latest.total_staff} prior={prior.total_staff} link="/totalstaff" />
                </div>
            </div>
            <br />
            <div id="new">
                <h4 className="text-2xl">New Positive Cases From Past 14 Days</h4>
                <div className="Section">
                    <Card name="Students" latest={latest.new_students} prior={prior.new_students} link="/newstudents" />
                    <Card name="Staff" latest={latest.new_staff} prior={prior.new_staff} link="/newstaff" />
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
                    <Card
                        name="On Campus"
                        latest={latest.quarantine_on_campus}
                        prior={prior.quarantine_on_campus}
                        link="/quarantineoncampus"
                    />
                    <Card
                        name="Off Campus"
                        latest={latest.quarantine_off_campus}
                        prior={prior.quarantine_off_campus}
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
                        prior={prior.isolation_on_campus}
                        link="isolationoncampus"
                    />
                    <Card
                        name="Off Campus"
                        latest={latest.isolation_off_campus}
                        prior={prior.isolation_off_campus}
                        link="isolationoffcampus"
                    />
                </div>
            </div>
            <br />
            <div id="tests">
                <h4 className="text-2xl">Number of Tests Administered by Student Health Center</h4>
                <div className="Section">
                    <Card
                        name="Tests to date"
                        latest={latest.tests_administered}
                        prior={prior.tests_administered}
                        link="/tests"
                    />
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
                        link="/beds"
                    />
                </div>
            </div>
        </>
    );
};

export default MainPage;
