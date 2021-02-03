import React from "react";
import {sortedArray} from "../App"

const Header = (props) => {
    const formatData = dati => {
        if (dati.length > 0) {
            let sorted = sortedArray(dati)
            let lastUpdated = sorted[0].data
            let lastUpdatedFormatted = lastUpdated
                .split("T")[0]
                .split("-")
                .reverse()
                .join("/");
            return lastUpdatedFormatted
        }
    };
    return (
        <header className="masthead">
            <div className="container h-100">
                <div className="row h-100 align-items-center">
                    <div className="col-12">
                        <h1 className="text-white mb-0">Covid 19 - Dashboard</h1>
                        <p className="small text-white mb-2 ">Fonte Protezione Civile</p>
                        <p className="text-white fs-5">Dati aggiornati al: {formatData(props.dati)}</p>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;