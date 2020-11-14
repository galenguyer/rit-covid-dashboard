import React from "react";
import "./Card.css";

const Card = (props) => {
    let diff = props.latest - props.prior;
    if (diff >= 0) {
        diff = "+" + diff.toString();
    }
    return (
        <div className="Card">
            <h3>{props.name}</h3>
            <p>
                {props.latest}
                {props.suffix}{" "}
                <span className="Diff">
                    ({diff}
                    {props.suffix})
                </span>
            </p>
        </div>
    );
};

export default Card;
