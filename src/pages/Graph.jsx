import { DateTime } from "luxon";
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ReferenceLine,
    ResponsiveContainer,
    Label,
} from "recharts";
import GoatCounter from "../components/GoatCounter";
import "./Graph.css";

const Graph = (props) => {
    const { name, response, dataKey, timeDifference } = props;
    const { data, loading, error } = response;

    if (loading) {
        return <div></div>;
    }

    const eventStyle = { fill: "#767676" };

    const parsed = data.map((d) => {
        return {
            date: DateTime.fromSQL(d["last_updated"], { zone: "UTC" }).setZone(DateTime.local().zoneName).toSeconds(),
            value: d[dataKey],
        };
    });

    return (
        <div>
            <div className="Title">{name}</div>
            <LineChart
                style={{ marginLeft: "auto", marginRight: "auto" }}
                width={window.innerWidth > 600 ? 750 : window.innerWidth * 0.9}
                height={500}
                margin={{ top: 15, right: 30, left: 0, bottom: 5 }}
                data={parsed}
            >
                <Line type="monotone" dataKey="value" stroke="#CD8508" dot={false} />
                <ReferenceLine
                    x={1644594525}
                    label={{ value: "Visitor Policy adjusted", angle: -90, style: eventStyle, position: "left" }}
                />
                <ReferenceLine
                    x={1647550274}
                    label={{ value: "Mask Mandate dropped", angle: -90, style: eventStyle, position: "left" }}
                />
                {}
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="date"
                    type="number"
                    tickCount={14}
                    domain={["dataMin", "dataMax"]}
                    tick={<CustomizedAxisTick />}
                    height={90}
                />
                <YAxis dataKey="value" type="number"></YAxis>
                <Tooltip content={CustomTooltip} />
            </LineChart>
            <GoatCounter />
        </div>
    );
};

const CustomizedAxisTick = ({ x, y, payload }) => {
    return (
        <g transform={`translate(${x},${y})`}>
            <text className="Graph-Label" x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-40)">
                {DateTime.fromSeconds(payload.value).toLocaleString()}
            </text>
        </g>
    );
};

const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
        return (
            <div className="custom-tooltip bg-white border-orange-300 border-2 rounded-lg p-2">
                <p className="label">
                    {DateTime.fromSeconds(label).toLocaleString({ weekday: "long", month: "long", day: "2-digit" })}
                </p>
                <p className="desc">{payload[0].value}</p>
            </div>
        );
    }
    return null;
};

export default Graph;
