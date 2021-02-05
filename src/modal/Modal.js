import React from 'react';
import Popup from 'reactjs-popup';
import "./Modal.css";

const Modal = (props) => (

  <Popup
    modal
    open={props.isOpen}
    lockScroll
    onClose={props.onClose}
  >

    <div className="modal-t">
      <button className="close" onClick={props.onClose}>
        &times;
        </button>
      <div className="header"> Modal Title </div>
      <div className="content">
        <h1>funzionaaaaa</h1>
      </div>
    </div>

  </Popup>
);

export default Modal;