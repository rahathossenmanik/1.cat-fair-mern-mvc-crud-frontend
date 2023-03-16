import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import TableSet from '../../../common/components/TableSet';

const AuthorList = ({ match }) => {
  const navigate = useNavigate();

  const [authors, setAuthors] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [pageNo, setPageNo] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [query, setQuery] = useState('');

  const loadAuthors = () => {
    axios.get(process.env.REACT_APP_API_BASE + '/api/authors/').then((response) => {
      setAuthors(response.data);
    });
  };

  const columns = [
    {
      title: 'Name',
      render: (row) => `${row?.givenName} ${row?.lastName}`
    },
    {
      title: 'Country',
      render: (row) => row?.country
    },
    {
      title: 'Date of Birth',
      render: (row) => (row?.birthdate ? row?.birthdate.slice(0, 10) : row?.birthdate)
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
              onClick={() => navigate('/authors/entry', { state: { author: row } })}>
              Edit
            </Button>
            <Button type="primary" danger ghost onClick={() => deleteAuthor(row?._id)}>
              Delete
            </Button>
          </>
        );
      }
    }
  ];

  useEffect(() => {
    loadAuthors();
  }, []);

  const onCreate = () => {
    navigate('/authors/entry', { state: { author: {} } });
  };

  const deleteAuthor = (_id) => {
    axios.delete(process.env.REACT_APP_API_BASE + `/api/authors/${_id}`).then(() => {
      loadAuthors();
    });
  };

  return (
    <>
      <TableSet
        columns={columns}
        data={authors}
        title="Authors"
        totalRows={totalRows}
        pageSize={perPage}
        setPageSize={setPerPage}
        pageNo={pageNo}
        setPageNo={setPageNo}
        setQuery={setQuery}
        queryPlaceholder="Search Authors"
        onCreate={onCreate}
      />
    </>
  );
};

export default AuthorList;
