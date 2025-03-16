export interface ILoadMoreBtnProps {
  children: React.ReactNode; // Типизация для children
  onClick: () => void;
  disabled: boolean | undefined;
}
