import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  tags,
  webformatURL,
  largeImageURL,
  openModal,
}) => {
  return (
    <li className={css.GalleryItem}>
      <img
        className={css.GalleryItemImage}
        src={webformatURL}
        onClick={() => openModal(largeImageURL, tags)}
        alt={tags}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
