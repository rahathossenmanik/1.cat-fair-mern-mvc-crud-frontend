import Home from '../../pages/Home';
import AuthorList from '../../pages/authors/view/AuthorList';
import AuthorEntry from '../../pages/authors/form/AuthorEntry';

export const authors = [
  { path: '/', element: <Home /> },
  { path: '/authors', element: <AuthorList /> },
  { path: '/authors/entry', element: <AuthorEntry /> },
];
