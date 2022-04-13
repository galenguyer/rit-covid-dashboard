import Card from "../components/Card";
import GoatCounter from "../components/GoatCounter";
import "./Index.css";

const Index = (props) => {
    const response = props.response;
    if (response.loading) {
        return <div>Loading...</div>;
    }

    const data = response.data;

    const latest = data[data.length - 1];
    const prior = data[data.length - (1 + props.timeDifference)];

    return (
        <div>
            <div>
                <div className="Message">
                    This dashboard has been refreshed for the new semester. Historical data from the 2020-2021 school
                    year is available at <a href="//2020.ritcoviddashboard.com">2020.ritcoviddashboard.com</a>. Data
                    from the Fall 2021 semester is available at{" "}
                    <a href="//2021.ritcoviddashboard.com">2021.ritcoviddashboard.com</a>.
                </div>
            </div>
            <div className="Section" id="total">
                <div className="Title">Total Positive Cases Since January 10 (First Day of Classes)</div>
                <div className="Cards">
                    <Card
                        name="Students"
                        link="/totalstudents"
                        latest={latest["total_students"]}
                        diff={latest["total_students"] - prior["total_students"]}
                    />
                    <Card
                        name="Staff"
                        link="/totalstaff"
                        latest={latest["total_staff"]}
                        diff={latest["total_staff"] - prior["total_staff"]}
                    />
                </div>
            </div>

            <div className="Section" id="new">
                <div className="Title">New Positive Cases From Past 14 Days</div>
                <div className="Cards">
                    <Card
                        name="Students"
                        link="/newstudents"
                        latest={latest["new_students"]}
                        diff={latest["new_students"] - prior["new_students"]}
                    />
                    <Card
                        name="Staff"
                        link="/newstaff"
                        latest={latest["new_staff"]}
                        diff={latest["new_staff"] - prior["new_staff"]}
                    />
                </div>
            </div>
            <GoatCounter />
        </div>
    );
};

export default Index;
