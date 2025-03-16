import { IImage } from '../СommonTypes/types';

export interface ImageGalleryProps {
  images: IImage[];
  openModal: (
    regular: string,
    alt_description: string | '',
    description: string | ''
  ) => void;
}
