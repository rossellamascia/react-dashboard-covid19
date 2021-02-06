import React from 'react';
import Popup from 'reactjs-popup';
import "./Modal.css";
import { Bar } from 'react-chartjs-2';

const Modal = (props) => (

  <Popup
    modal
    open={props.isOpen}
    lockScroll
    onClose={props.onClose}
  >

    <div className="modal-custom" onClick={props.onClose}>
      <div className="modal-custom-dialog modal-custom-dialog-scrollable modal-custom-dialog-centered">
        <div className="modal-custom-content">
          <div className="modal-custom-header">
            <h3 className="fs-3">{props.name}</h3> <span className="close" onClick={props.onClose}>×</span>
          </div>
          <div className="modal-custom-body">
            <div className="row">
              <div className="col-12">
                <Bar
                  data={[]}
                  width={100}
                  height={50}
                  options={{ maintainAspectRatio: true }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </Popup>
);

export default Modal;