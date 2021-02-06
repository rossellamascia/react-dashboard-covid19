import React, { useState } from "react";
import Modal from "../modal/Modal"

const StartCard = (props) => {
    const [open, setOpen] = useState(false)
    return (
        <>
            <div className="col-12 col-md-3 mb-4">
                <div className={`card-custom rounded-3 d-flex flex-column h-100 text-white ${props.color}`} data-trend={props.dataTrend} onClick={() => setOpen(!open)}>
                    <p className="ms-3 fs-4 mt-3 fw-light mb-0">{props.name}</p>
                    <p id="totalCases" className="fs-3 ms-3 pe-3 text-white fw-bolder">{props.dati}</p>
                    <hr className="text-white mt-0" />
                    <p className="text-white ms-3">scopri di più</p>
                </div>
            </div>
            <Modal isOpen={open} onClose={()=>setOpen(false) } name={props.name}/>
        </>
    )
}

export default StartCard;