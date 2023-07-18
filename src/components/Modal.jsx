import React from "react";
import "../App.css";

const Modal = ({ modal, setModal }) => {
    return (
        <div className="modal">
            <h4>{ modal.title }</h4>
            <p>{ modal.timestamp.toLocaleDateString() }</p>
            <p>{ modal.contents }</p>
            <button onClick={() => setModal(null)}>close</button>
        </div>
    );
};

export default Modal;
