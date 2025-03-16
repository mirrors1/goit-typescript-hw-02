import { ILoadMoreBtnProps } from './LoadMore.type';
import s from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ children, onClick, disabled }: ILoadMoreBtnProps) => {
  return (
    <button className={s.btn} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
export default LoadMoreBtn;
