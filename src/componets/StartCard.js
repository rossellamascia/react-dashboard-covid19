import React from "react";


 
const StartCard = (props) => { 
 
    return (
        <div className="col-12 col-md-3 mb-4">
            
            <div className={`card-custom rounded-3 d-flex flex-column h-100 text-white ${props.color}`}  >
                <p className="ms-3 fs-4 mt-3 fw-light mb-0" style={{color: "bg-accent"}}>{props.name}</p>
                <p id="totalCases" className="fs-3 ms-3 pe-3 text-white fw-bolder" >{props.numero}</p>
                <hr className="text-white mt-0" />
                <p className="text-white ms-3" style={{color: "bg-accent"}}>scopri di più</p>
            </div>
        </div>
    )
}

export default StartCard;