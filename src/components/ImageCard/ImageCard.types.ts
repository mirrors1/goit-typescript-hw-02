import { IImage } from '../СommonTypes/types';

export interface IImageCardProps {
  image: IImage;
  openModal: (
    regular: string,
    alt_description: string | '',
    description: string | ''
  ) => void;
}
