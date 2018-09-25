import React, { Component } from 'react';
import './Modal.css';

class Modal extends Component {


  render() {

    return (
      <div className={this.props.show ? "modal display-block" : "modal display-none"}>
        <div className="modal-main">
          <div>
            <span className={"closeSpan"} onClick={this.props.handleClose}>&times;</span>
          </div>
          <div className={"modalHeader"}>
            <h4>{this.props.headerText}</h4>
          </div>
          <div className={"modalBody"}>
            {this.props.children}
          </div>
          <div className={"modalFooter"}>
            
          </div>
        </div>
      </div>
    );

  }
}

export default Modal;
