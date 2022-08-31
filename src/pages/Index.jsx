import "./Index.css";

const Index = () => {
    return (
        <div className="Message">
            <h2>2022-2023 Dashboard</h2>
            <p>
                RIT is not providing a COVID dashboard for the 2022-2023 semester. As such, I have no source for any
                data to update this dashboard.
            </p>
            <p>
                At the beginning of the semester, <a href="https://rit.edu/ready">rit.edu/ready</a> claimed that a new
                dashboard would be published, as visible in{" "}
                <a className="BlueLink" href="https://web.archive.org/web/20220802081911/https://www.rit.edu/ready/">
                    this snapshot taken August 2nd on archive.org
                </a>
                . However, that was removed sometime between August 15th and August 31st, as seen in{" "}
                <a className="BlueLink" href="https://web.archive.org/web/20220831160558/https://www.rit.edu/ready/">
                    this snapshot taken August 31st.
                </a>{" "}
                The updated site did claim "The level of COVID RNA found in this week’s wastewater samples is slightly
                higher than last spring".
            </p>

            <p>
                There is a{" "}
                <a class="BlueLink" href="https://pawprints.rit.edu/?p=3546">
                    PawPrints petition to restore the COVID dashboard
                </a>{" "}
                so students can see the current level of risk. If you're concerned about RIT's handling of the pandemic,
                you should sign this! Unless RIT gives us the dashboard back, we have no visiblity into how many cases
                there are on campus.
            </p>

            <hr />

            <h3>Prior Dashboards</h3>
            <p>
                The dashboards from the last two years are still online. I'll be keeping them up indefinitely so
                everyone can see RIT's handling of the pandemic.
            </p>
            <p>
                The dashboard for the 2020-2021 school year is available at{" "}
                <a className="BlueLink" href="https://2020.ritcoviddashboard.com/">
                    2020.ritcoviddashboard.com
                </a>
            </p>
            <p>
                The dashboard for the 2021-2022 school year is available at{" "}
                <a className="BlueLink" href="https://2021.ritcoviddashboard.com/">
                    2021.ritcoviddashboard.com
                </a>
            </p>
            <p>
                If you would like the raw data I've collected, or have any questions, concerns, or comments, please
                reach out to me at <a href="mailto:gkg1648@rit.edu">gkg1648@rit.edu</a>
            </p>
        </div>
    );
};

export default Index;
