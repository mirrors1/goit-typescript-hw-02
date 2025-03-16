import { FC } from 'react';
import { PiHeartFill } from 'react-icons/pi';
import s from './ImageCard.module.css';
import { IImageCardProps } from './ImageCard.types';
import React from 'react';

const ImageCard: FC<IImageCardProps> = ({
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
      {likes && likes < 999999 && (
        <div className={s.containerLike}>{likes}</div>
      )}
      <div className={s.description}>
        {description ? description : alt_description}
      </div>
    </div>
  );
};
export default ImageCard;
