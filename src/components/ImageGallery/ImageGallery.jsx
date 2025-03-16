import ImageCard from '../ImageCard/ImageCard';
import s from './ImageGallery.module.css';

const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={s.list}>
      {images.map(item => (
        <li className={s.item} key={item.id}>
          <ImageCard image={item} openModal={openModal} />
        </li>
      ))}
    </ul>
  );
};
export default ImageGallery;
