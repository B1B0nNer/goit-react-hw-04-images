import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import './imageGallery.css';

const ImageGallery = ({ images }) => {
  return (
    <ul className="imageGallery">
      {images.map(({ webformatURL, id, largeImageURL }) => (
        <ImageGalleryItem
          src={webformatURL}
          key={id}
          largeImage={largeImageURL}
        ></ImageGalleryItem>
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object.isRequired),
};

export default ImageGallery;