import { useEffect, useState } from 'react';
import { FaRegSadCry } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import { BiSolidError } from 'react-icons/bi';
import toast from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar';
import * as imagesService from '../../services/api';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import s from './App.module.css';
import { ImageModal } from '../ImageModal/ImageModal';
import ScrollTop from '../ScrollTop/ScrollTop';
import { IImage } from '../СommonTypes/types';

function App() {
  const [images, setImages] = useState<IImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  // const [error, setError] = useState<string>(false);
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalSrc, setModalSrc] = useState<string>('');
  const [modalAlt, setModalAlt] = useState<string>('');
  const [modalDescription, setModalDescription] = useState<string>('');

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
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [query, page]);

  const handleSetQuery = (newQuery: string) => {
    setQuery(newQuery);
    setImages([]);
    setIsEmpty(false);
    setIsVisible(false);
    setPage(1);
    setError('');
    // setError(null);
  };
  const onLoadMore = (): void => {
    setPage(perPage => perPage + 1);
  };

  const openModal = (
    src: string,
    alt: string | '',
    description: string | ''
  ): void => {
    setModalIsOpen(true);
    setModalSrc(src);
    setModalAlt(alt);
    setModalDescription(description);
  };
  const closeModal = (): void => {
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
          <ErrorMessage textAlign="center" marginBottom="0">
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
          <ErrorMessage textAlign="center" marginBottom="0">
            <BiSolidError className={s.iconError} /> Щось пішло не так - {error}
          </ErrorMessage>
        )}
        {isEmpty && (
          <ErrorMessage textAlign="center" marginBottom="0">
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
        <ScrollTop />
      </div>
    </>
  );
}

export default App;
