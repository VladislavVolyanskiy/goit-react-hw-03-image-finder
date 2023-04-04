import PropTypes from 'prop-types';
import css from './Button.module.css';

export const Button = ({ onLoadMore }) => {
  return (
    <button className={css.ButtonLoadMore} type="button" onClick={onLoadMore}>
      Load More
    </button>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
