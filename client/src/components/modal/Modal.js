import React from 'react';
import "./Modal.css"
const Modal = ({title,message,show,setShow}) => {
    return (
        <div className={`modal-background ${show?'show-modal':''}`}>
            <div className="modal">
                <h2>{title}</h2>
                <p>{message}</p>
                <button className='modal-button' onClick={setShow}>ok</button>
            </div>
        </div>
    );
}

export default Modal;
