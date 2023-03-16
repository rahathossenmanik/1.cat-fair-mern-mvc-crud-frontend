import BookList from '../../pages/books/list/BookList';
import Home from './../../pages/Home';
import BookEntry from '../../pages/books/form/BookEntry';

export const books = [
  { path: '/', element: <Home /> },
  { path: '/books', element: <BookList /> },
  { path: '/books/entry', element: <BookEntry /> }
];
