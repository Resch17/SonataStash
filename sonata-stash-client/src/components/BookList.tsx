import { Book } from '../types';

interface BookListProps {
  books: Book[];
}
export const BookList = ({ books }: BookListProps) => {
  return (
    <section>
      <ul className="space-y-2 pl-6">
        {books.map((book) => (
          <li key={book.bookId}>
            <p>
              {book.composer && <b>{book.composer.lastName}</b>}
              {book.composer && ' - '}
              {book.bookTitle}
              {book.publisher && ' - '}
              {book.publisher && <i>{book.publisher}</i>}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};
