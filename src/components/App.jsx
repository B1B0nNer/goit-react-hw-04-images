import React, { Component } from 'react';
import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import LoadMoreBtn from './LoadMoreBtn';
import getImages from './services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {
    serchReqest: '',
    status: 'idle',
    imagesList: [],
    page: 1,
    error: null,
    totalHits: null,
  };

  componentDidMount() {
    this.fetchImages();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.serchReqest !== this.state.serchReqest ||
      prevState.page !== this.state.page
    ) {
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { serchReqest, page } = this.state;
    if (!serchReqest) {
      return;
    }
    this.setState({ status: 'pending' });
    getImages(serchReqest, page)
      .then((images) => {
        if (images.hits.length === 0) {
          this.setState({ status: 'empty' });
          return;
        }
        this.setState((prevState) => ({
          imagesList: [...prevState.imagesList, ...images.hits],
          status: 'completed',
          totalHits: images.totalHits,
        }));
      })
      .catch((error) => {
        this.setState({ error, status: 'rejected' });
        console.log('у вас Ошибка => ', error);
      });
  };

  onSubmit = (req) => {
    if (req === this.state.serchReqest) {
      return toast.error('Enter new request ^_^');
    }
    this.setState({ serchReqest: req, page: 1, imagesList: [] });
  };

  loadMoreBtnHandler = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };

  render() {
    const { serchReqest, status, imagesList, totalHits, error } = this.state;

    if (totalHits === imagesList.length) {
      toast.error('Sorry, there are no more photos :(');
    }
    if (status === 'error') {
      toast.error(`${error}`);
    }

    return (
      <div className="app">
        <SearchBar onSubmit={this.onSubmit} />
        {status === 'idle' && (
          <h1 className="temporaty-heading">Enter your request ⬆️</h1>
        )}

        {status === 'empty' && (
          <h1 className="temporaty-heading">
            No results by request "{serchReqest}" 😢
          </h1>
        )}

        <ImageGallery images={imagesList} />

        {status === 'pending' && <Loader />}

        {imagesList.length !== 0 &&
          totalHits !== imagesList.length &&
          status !== 'pending' && (
            <LoadMoreBtn onClickHandler={this.loadMoreBtnHandler} />
          )}

        <ToastContainer theme="colored" />
      </div>
    );
  }
}

export default App;
