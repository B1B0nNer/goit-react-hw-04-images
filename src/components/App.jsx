import React, { useState, useEffect } from 'react';
import Searchbar from './SearchBar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import LoadMoreBtn from './LoadMoreBtn';
import getImages from './services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [serchReqest, setSerchReqest] = useState('');
  const [status, setStatus] = useState('idle');
  const [imagesList, setImagesList] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [totalHits, setTotalHits] = useState(null);

  useEffect(() => {
    if (!serchReqest) {
      return;
    }
    setStatus('pending');
    getImages(serchReqest, page)
      .then(images => {
        if (images.hits.length === 0) {
          setStatus('empty');
          return;
        }
        setImagesList(prevImages => [...prevImages, ...images.hits]);
        setStatus('completed');
        setTotalHits(images.totalHits);
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
        console.log('у вас Ошибка => ', error);
      });
  }, [serchReqest, page]);

  const onSubmit = req => {
    if (req === serchReqest) {
      return toast.error('Enter new request ^_^');
    }
    setSerchReqest(req);
    setPage(1);
    setImagesList([]);
  };

  const loadMoreBtnHandler = () => {
    setPage(prState => prState + 1);
  };

  if (totalHits === imagesList.length) {
    toast.error('Sorry, there are no more photos :(');
  }
  if (status === 'error') {
    toast.error(`${error}`);
  }

  return (
    <div className="app">
      <Searchbar onSubmit={onSubmit} />
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
          <LoadMoreBtn onClickHandler={loadMoreBtnHandler} />
        )}

      <ToastContainer theme="colored" />
    </div>
  );
};