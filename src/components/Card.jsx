import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

const Card = (props) => {
    let diff = props.diff.toString();
    if (diff.charAt(0) != "-") {
        diff = "+" + diff;
    }

    return (
        <Link className="cardLink" to={props.link}>
            <div className="Card animate">
                <p>
                    <span className="Latest">{props.latest}</span> <span className="Diff animate">({diff})</span>
                </p>
                <h3>
                    {props.name}
                </h3>
            </div>
        </Link>
    );
};

export default Card;
