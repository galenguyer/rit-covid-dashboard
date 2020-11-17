import { React } from "react";
import { DateTime } from "luxon";
import GoatCounter from "./GoatCounter";

const HistoryTable = (props) => {
    const data = props.data;
    console.log(data);
    let table = (
        <table className="table-auto" style={{ marginLeft: "auto", marginRight: "auto" }}>
            <tbody>
                <tr>
                    <td className="border py-2 px-4">Date</td>
                    <td className="border py-2 px-4">Positive Case Rate</td>
                </tr>
                {data.map((element) => {
                    return (
                        <tr>
                            <td className="border px-4" py-2>
                                {DateTime.fromSQL(element.date, { zone: "UTC" })
                                    .setZone(DateTime.local().zoneName)
                                    .toLocaleString({ weekday: "long", month: "long", day: "2-digit" })}
                            </td>
                            <td className="border px-4 py-2">{element.value}%</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );

    return (
        <>
            <h3 className="text-3xl">{props.name}</h3>
            {table}
            <GoatCounter />
        </>
    );
};

export default HistoryTable;
