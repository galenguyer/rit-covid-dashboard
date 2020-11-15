import React from "react";

class GoatCounter extends React.Component {
    componentDidMount() {
        window.counter = "https://rcd.goatcounter.com/count";
        const script = window.document.createElement("script");
        script.async = 1;
        script.src = "https://gc.zgo.at/count.js";
        script.id = "goatcounter";
        script.setAttribute("data-goatcounter", "https://rcd.goatcounter.com/count");
        (window.document.head || window.document.body).appendChild(script);
    }

    componentWillUnmount() {
        const script = window.document.getElementById("goatcounter");
        if (script) {
            script.parentNode.removeChild(script);
        }
    }

    render() {
        return null;
    }
}

export default GoatCounter;
