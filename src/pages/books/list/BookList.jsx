import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import TableSet from '../../../common/components/TableSet';

const BookList = ({ match }) => {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [pageNo, setPageNo] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [query, setQuery] = useState('');
  const loadBooks = () => {
    axios.get(process.env.REACT_APP_API_BASE + '/api/books/').then((response) => {
      setBooks(response.data);
    });
  };

  const columns = [
    {
      title: 'Title',
      render: (row) => row?.title
    },
    {
      title: 'Author',
      render: (row) => `${row?.author?.givenName} ${row?.author?.lastName}`
    },
    {
      title: 'Genre',
      render: (row) => row?.genre
    },
    {
      title: 'Publication Date',
      render: (row) => (row?.publicationDate ? row?.publicationDate.slice(0, 10) : row?.publicationDate)
    },
    {
      title: 'Action',
      align: 'center',
      render: (row) => {
        return (
          <>
            <Button
              type="primary"
              className="me-1"
              ghost
              as={Link}
              onClick={() => navigate('/books/entry', { state: { book: row } })}>
              Edit
            </Button>
            <Button type="primary" danger ghost onClick={() => deleteBook(row?._id)}>
              Delete
            </Button>
          </>
        );
      }
    }
  ];

  useEffect(() => {
    loadBooks();
  }, []);

  const onCreate = () => {
    navigate('/books/entry', { state: { book: {} } });
  };

  const deleteBook = (_id) => {
    axios.delete(process.env.REACT_APP_API_BASE + `/api/books/${_id}`).then(() => {
      loadBooks();
    });
  };

  return (
    <>
      <TableSet
        columns={columns}
        data={books}
        title="Books"
        totalRows={totalRows}
        pageSize={perPage}
        setPageSize={setPerPage}
        pageNo={pageNo}
        setPageNo={setPageNo}
        setQuery={setQuery}
        queryPlaceholder="Search Books"
        onCreate={onCreate}
      />
    </>
  );
};

export default BookList;
