import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

const Card = (props) => {
    let diff = props.latest - props.prior;
    if (diff >= 0) {
        diff = "+" + diff.toString();
    }
    return (
        <Link className="Card" style={{ padding: 0 }} to={props.link}>
            <div className="group bg-white hover:bg-orange-400 rounded-lg border-2 border-orange-300 hover:border-orange-400 p-4 m-6 transition ease-in-out duration-300">
                <p>
                    <span className="text-2xl group-hover:text-white transition ease-in-out duration-300">
                        {props.latest}
                        {props.suffix}{" "}
                    </span>
                    <span className="Diff text-gray-600 group-hover:text-gray-100 text-sm transition ease-in-out duration-300">
                        ({diff}
                        {props.suffix})
                    </span>
                </p>
                <h3 className="text-base group-hover:text-white transition ease-in-out duration-300">{props.name}</h3>
            </div>
        </Link>
    );
};

export default Card;
