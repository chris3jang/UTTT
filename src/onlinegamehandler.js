import React, { Component } from 'react';
import './Modal.css';

class OnlineGameHandler extends Component {


  close(e) {
    const {onClose} = this.props
    e.preventDefault()

    if(onClose) {
      onClose();
    }
  }

  render() {
    
    const {isOpen, width, height, style, containerClassName, className, backdropClassName, children, noBackdrop} = this.props
    console.log(isOpen)
    if(isOpen === false) {
      return null
    }

    const modalStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: '9999',
      background: '#fff'
    }

    if(width && height) {
      modalStyle.width = width + 'px'
      modalStyle.height = height + 'px'
      modalStyle.marginLeft = '-' + (width/2) + 'px',
      modalStyle.marginTop = '-' + (height/2) + 'px',
      modalStyle.transform = null
    }

    if (style) {
      for (const key in style) {
        modalStyle[key] = style[key]
      }
    }

    let backdropStyle = {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: '0px',
      left: '0px',
      zIndex: '9998',
      background: 'rgba(0, 0, 0, 0.3)'
    }

    if (this.props.backdropStyle) {
      for (let key in this.props.backdropStyle) {
        backdropStyle[key] = this.props.backdropStyle[key]
      }
    }

    return (
        <div className={containerClassName}>
          <div className={className} style={modalStyle}>
            {children}
          </div>
          {!noBackdrop && 
            <div className={backdropClassName} style={backdropStyle}
              onClick={e => this.close(e)}/>}
        </div>
    );
  }
}

export default OnlineGameHandler;
