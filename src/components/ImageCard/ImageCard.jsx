import { PiHeartFill } from 'react-icons/pi';
import s from './ImageCard.module.css';
const ImageCard = ({
  image: {
    urls: { small, regular },
    alt_description,
    likes,
    description,
  },
  openModal,
}) => {
  return (
    <div className={s.card}>
      <img
        className={s.image}
        src={small}
        alt={alt_description}
        onClick={() => openModal(regular, alt_description, description)}
      />
      <PiHeartFill className={s.iconLike} />
      {likes < 999999 && <div className={s.containerLike}>{likes}</div>}
      <div className={s.description}>
        {description !== null ? description : alt_description}
      </div>
    </div>
  );
};
export default ImageCard;
