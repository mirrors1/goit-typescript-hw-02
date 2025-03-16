import { useEffect, useState } from 'react';
import { FaRegSadCry } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import { BiSolidError } from 'react-icons/bi';
import toast from 'react-hot-toast';
import SearchBar from './SearchBar/SearchBar';
import * as imagesService from '../services/api';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import s from './App.module.css';
import { ImageModal } from './ImageModal/ImageModal';

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState('');
  const [modalAlt, setModalAlt] = useState('');
  const [modalDescription, setModalDescription] = useState('');

  useEffect(() => {
    if (!query) return;
    const getData = async () => {
      try {
        setIsLoading(true);
        const { results, total_pages } = await imagesService.fetchImages(
          query,
          page
        );

        if (!results.length) {
          return setIsEmpty(true);
        }

        setImages(prev => [...prev, ...results]);
        setIsVisible(page < total_pages);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [query, page]);

  const handleSetQuery = newQuery => {
    setQuery(newQuery);
    setImages([]);
    setIsEmpty(false);
    setIsVisible(false);
    setPage(1);
    setError(null);
  };
  const onLoadMore = () => {
    setPage(perPage => perPage + 1);
  };
  const openModal = (src, alt, description) => {
    setModalIsOpen(true);
    setModalSrc(src);
    setModalAlt(alt);
    setModalDescription(description);
  };
  const closeModal = () => {
    setModalIsOpen(false);
    setModalSrc('');
    setModalAlt('');
    setModalDescription('');
  };
  return (
    <>
      {!modalIsOpen && <SearchBar onSearch={handleSetQuery} />}
      <div className="container">
        {!images.length && !isEmpty && (
          <ErrorMessage>
            Пошук підтримує українську мову. Тож почнемо пошуки
            <IoSearch className={s.icon} />
          </ErrorMessage>
        )}
        {images.length > 0 && (
          <ImageGallery images={images} openModal={openModal} />
        )}
        {isLoading && <Loader />}
        {isVisible && (
          <LoadMoreBtn onClick={onLoadMore} disabled={isLoading}>
            {isLoading ? 'Завантаження...' : 'Завантажити більше'}
          </LoadMoreBtn>
        )}
        {error && (
          <ErrorMessage>
            <BiSolidError className={s.iconError} /> Щось пішло не так - {error}
          </ErrorMessage>
        )}
        {isEmpty && (
          <ErrorMessage>
            Вибач. Я не знайшов зображень ... <FaRegSadCry className={s.icon} />
          </ErrorMessage>
        )}
        <ImageModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          src={modalSrc}
          alt={modalAlt}
          description={modalDescription}
        />
      </div>
    </>
  );
}

export default App;
