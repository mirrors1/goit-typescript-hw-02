import { IImage } from '../components/СommonTypes/types';

export interface IResponse {
  results: IImage[];
  total: number;
  total_pages: number;
}
