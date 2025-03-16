export interface IImage {
  id: string;
  urls: { small: string; regular: string };
  alt_description: string | '';
  likes: number | null;
  description: string | '';
}
