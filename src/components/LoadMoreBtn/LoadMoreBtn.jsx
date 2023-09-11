import PropTypes from 'prop-types';
import './loadMoreBtn.css';

const LoadMoreBtn = ({ onClickHandler }) => {
  return (
    <button type="button" className="loadButton" onClick={onClickHandler}>
      Load More
    </button>
  );
};

LoadMoreBtn.propTypes = {
  onClickHandler: PropTypes.func.isRequired,
};

export default LoadMoreBtn;