import React, { useState } from "react";
import { lastUpdated } from "./utility";


const RegionPositive = (props) => {
    const [dati , setDati] = useState(props.dati)
    // console.log(dati);
    const cardRegion = (dati) => dati.length > 0 ? lastUpdated(dati).forEach(el => setDati(el.nuovi_positivi)) : "cio"
    
  

    return (
        <div className="container mb-5">
            <div className="row px-3 pt-5">
                <div className="col-12">
                    <h3 className="text-white bg-warning p-3 d-inline-block fw-normal rounded-top mb-0 fs-5">Nuovi positivi per Regione</h3>
                </div>
            </div>
            <div className="row ">
                <div className="col-12 col-md-12 bg-secondary rounded-3">
                    <div id="cardWrapper" className="row p-3 justify-content-center">
                        <div className="col-12 col-md-3 my-4">
                            <div className="card-custom h-100 rounded-3 d-flex flex-column" data-region="{el.denominazione_regione}">
                                <p className="mb-0 ms-3 mt-3"></p>
                                <p className="fw-bold fs-4 mb-0 ms-3"></p>
                                <p className="small my-0 ms-3"></p>
                                <hr className="text-main" />
                                <p className="text-main ms-3">scopri di più</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default RegionPositive;