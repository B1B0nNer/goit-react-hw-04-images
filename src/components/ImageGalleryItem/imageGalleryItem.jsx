import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import './imageGalleryItem.css';

class ImageGalleryItem extends Component {
  state = {
    modal: false,
  };

  toggleModalHandler = () => {
    this.setState((prevState) => ({ modal: !prevState.modal }));
  };

  render() {
    const { src, largeImage } = this.props;
    const { modal } = this.state;

    return (
      <>
        <li className="imageGalleryItem" onClick={this.toggleModalHandler}>
          <img src={src} alt="" className="imageGalleryItem-image" />
        </li>
        {modal && <Modal image={largeImage} closeModal={this.toggleModalHandler} />}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
