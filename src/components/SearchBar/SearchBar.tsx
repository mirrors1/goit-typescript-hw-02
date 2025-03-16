import { IoSearch } from 'react-icons/io5';
import s from './SearchBar.module.css';
import toast from 'react-hot-toast';

const SearchBar = ({ onSearch }) => {
  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.target;
    const search = form.elements.search.value;

    // Якщо текстове поле порожнє, виводимо повідомлення
    // і припиняємо виконання функції.
    if (search.trim() === '') {
      toast.error(`Введіть текст для пошуку зображень`);
      return;
    }

    // У протилежному випадку викликаємо пропс
    // і передаємо йому значення поля
    onSearch(search.trim());
    form.reset();
  };

  return (
    <header className={s.header}>
      <form className={s.form} onSubmit={handleSubmit}>
        <button className={s.btn} type="submit">
          <IoSearch className={s.icon} />
        </button>
        <input
          className={s.input}
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
          placeholder="Пошук зображень і фотографій"
        />
      </form>
    </header>
  );
};
export default SearchBar;
