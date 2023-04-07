import { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { ImageGallery } from '../ImageGallery/ImageGallery';
import { SearchBar } from '../SearchBar/SearchBar';
import { Loader } from '../Loader/Loader';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';
import { PicsApi } from '../../api/PicsApi';

import css from './App.module.css';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    error: null,
    status: STATUS.IDLE,
    totalHits: null,
  };

  componentDidUpdate = (_, prevState) => {
    const prevQuery = prevState.searchQuery;
    const newQuery = this.state.searchQuery;
    const prevPage = prevState.page;
    const newPage = this.state.page;

    if (prevQuery !== newQuery || prevPage !== newPage)
      this.onFetchDataHandle();
  };

  handleFormSubmit = searchQuery => {
    if (searchQuery === this.state.searchQuery) {
      return toast('Pictures on this query have already been requested!', {
        icon: '⚠️',
      });
    }
    this.setState({
      searchQuery,
      page: 1,
      images: [],
      status: STATUS.IDLE,
      totalHits: null,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  result = data => {
    return data.map(({ id, tags, largeImageURL, webformatURL }) => ({
      id,
      tags,
      largeImageURL,
      webformatURL,
    }));
  };

  onFetchDataHandle = async () => {
    const { searchQuery, page } = this.state;
    this.setState({ isLoading: false, status: STATUS.PENDING });
    try {
      const { hits, totalHits } = await PicsApi(searchQuery, page);

      if (totalHits === 0) {
        this.setState({ status: STATUS.IDLE });
        return toast('No images found!', {
          icon: '🙈',
        });
      }

      const newImages = this.result(hits);

      if (page > 1) {
        return this.setState(({ images }) => ({
          images: [...images, ...newImages],
          totalHits,
        }));
      }

      this.setState({
        status: STATUS.RESOLVED,
        images: newImages,
        totalHits: totalHits,
      });
    } catch (error) {
      this.setState({ error, status: STATUS.REJECTED });
      toast.error('This is an error!');
      console.log(error);
    } finally {
      this.setState({ isLoading: false, status: STATUS.IDLE });
    }
  };

  isLoadMoreBtnVisible = () => {
    const hitsExceedPage = this.state.totalHits - this.state.page * 12;
    if (hitsExceedPage > 0) {
      return !this.state.isLoading;
    }
    return false;
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  openModal = (largeImageURL, tags) => {
    this.toggleModal();
    this.setState({
      largeImageURL,
      tags,
    });
  };

  render() {
    const { images, status, largeImageURL, tags, showModal, isLoading } =
      this.state;
    return (
      <div className={css.App}>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2500,
          }}
        />
        {isLoading && <Loader />}
        <SearchBar onSubmit={this.handleFormSubmit} />
        {images.length > 0 && (
          <ImageGallery
            images={images}
            openModal={this.openModal}
          ></ImageGallery>
        )}
        {status === 'pending' && <Loader />}
        {this.isLoadMoreBtnVisible() && (
          <Button onLoadMore={this.loadMore}></Button>
        )}
        {showModal && (
          <Modal
            onModalClick={this.toggleModal}
            largeImageURL={largeImageURL}
            tags={tags}
          />
        )}
      </div>
    );
  }
}
