import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './modal.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeModalHandler);
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModalHandler);
    document.body.style.overflow = 'visible';
  }

  closeModalHandler = (evt) => {
    if (evt.code === 'Escape' || evt.target === evt.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    const { image } = this.props;

    return (
      <div className="overlay" onClick={this.closeModalHandler}>
        <div className="modal">
          <img src={image} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
