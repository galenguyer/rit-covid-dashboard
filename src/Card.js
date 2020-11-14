import React from "react";
import "./Card.css";

const Card = (props) => {
    let diff = props.latest - props.prior;
    if (diff >= 0) {
        diff = "+" + diff.toString();
    }
    return (
        <div className="Card bg-white rounded-lg border-2 border-orange-300 p-4 m-4">
            <p>
                <span className="text-2xl">
                    {props.latest}
                    {props.suffix}{" "}
                </span>
                <span className="Diff text-gray-600 text-sm">
                    ({diff}
                    {props.suffix})
                </span>
            </p>
            <h3 className="text-base">{props.name}</h3>
        </div>
    );
};

export default Card;
