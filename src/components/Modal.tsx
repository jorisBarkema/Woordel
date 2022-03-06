import React, { FunctionComponent } from "react";

interface IProps {
    title : string,
    name : string
}

// markup
const Modal : FunctionComponent<IProps> = ({
    children,
    title,
    name
}) => {

    let id : string = name + "-modal";

    function closeModal(e : any) {
        let modal : HTMLElement | null = document.getElementById(id);
        
        if (modal !== null) {
            modal.style.opacity = "0";
        }
    };


  return (
    <div id={id} className="modal">
        <div className="modal-closer" onClick={closeModal}>
            <span>X</span>
        </div>
        <div className="modal-header">
            <h1>{ title }</h1>
        </div>
        <div className="modal-body">
            { children }
        </div>
    </div>
  )
}

export default Modal