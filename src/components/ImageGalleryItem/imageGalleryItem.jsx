import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import './imageGalleryItem.css';

const ImageGalleryItem = ({ src, largeImage }) => {
  const [modal, setModal] = useState(false);

  const toggleModalHandler = () => {
    setModal(!modal);
  };
  return (
    <>
      <li className="imageGalleryItem" onClick={toggleModalHandler}>
        <img src={src} alt="" className="imageGalleryItem-image" />
      </li>
      {modal && <Modal image={largeImage} closeModal={toggleModalHandler} />}
    </>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
};

export default ImageGalleryItem;