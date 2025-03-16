import s from './ErrorMessage.module.css';
const ErrorMessage = ({
  children,
  textAlign = 'center',
  marginBottom = '0',
}) => {
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
