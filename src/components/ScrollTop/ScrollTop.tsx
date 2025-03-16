// import { useRef } from 'react';
import { useEffect, useState } from 'react';
import s from './ScrollTop.module.css';
import { IoIosArrowUp } from 'react-icons/io';

const ScrollTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  //   const ref = useRef(null);

  // Функція для відслідковування прокрутки
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true); // Показуємо кнопку, якщо прокрутка більше 300px
    } else {
      setIsVisible(false); // Приховуємо кнопку, якщо прокрутка менша за 300px
    }
  };

  // Додаємо обробник прокрутки
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Функція для прокручування до верху
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth', // Плавна прокрутка
    });
  };

  return (
    <>
      {isVisible && (
        <div className={s.scrollTop} onClick={scrollToTop}>
          <IoIosArrowUp className={s.icon} />
        </div>
      )}
    </>
  );
};
export default ScrollTop;
