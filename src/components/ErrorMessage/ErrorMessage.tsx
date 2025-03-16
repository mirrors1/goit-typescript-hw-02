import { FC } from 'react';
import s from './ErrorMessage.module.css';
// import { IErrorMessageProps } from './ErrorMessage.types';

interface IErrorMessageProps {
  textAlign: string;
  marginBottom: string;
  children: React.ReactNode; // Типизация для children
}

const ErrorMessage = ({
  textAlign = 'center',
  marginBottom = '0',
  children,
}: IErrorMessageProps) => {
  return (
    <p
      className={[
        s['text'],
        s[textAlign],
        s[`marginBottom${marginBottom}`],
      ].join(' ')}
    >
      {children}
    </p>
  );
};
export default ErrorMessage;
