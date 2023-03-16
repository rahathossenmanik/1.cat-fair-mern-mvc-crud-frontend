import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
const Field = Form.Item;

const BookEntry = () => {
  const {
    state: { book }
  } = useLocation();
  const bookId = book?._id;
  const [redirect, setRedirect] = useState(false);
  const [authors, setAuthors] = useState([]);

  const initialValues = {
    title: book?.title || '',
    author: book?.author?._id || '',
    genre: book?.genre || '',
    publicationDate: dayjs(book?.publicationDate) || ''
  };

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_BASE + '/api/authors/').then((response) => {
      setAuthors(
        response.data.map((author) => ({
          label: `${author.givenName} ${author.lastName}`,
          value: author._id
        }))
      );
    });
  }, []);

  const onFinish = (values) => {
    const payload = { ...values, publicationDate: values?.publicationDate?.$d };
    console.log(payload);
    try {
      bookId
        ? axios.put(process.env.REACT_APP_API_BASE + `/api/books/${bookId}`, {
            ...payload,
            _id: bookId
          })
        : axios.post(process.env.REACT_APP_API_BASE + '/api/books', payload);
      setRedirect(true);
    } catch (error) {
      alert('An Error Occured');
    }
  };

  return (
    <>
      {redirect ? (
        <Navigate to="/books" push />
      ) : (
        <>
          <Form initialValues={initialValues} onFinish={onFinish} autoComplete="off" layout="vertical">
            <Row gutter={[8, 0]} className="mt-3">
              <Col lg={8} md={12}>
                <Field label="Title" name="title" rules={[{ required: true, message: 'Title is required!' }]}>
                  <Input />
                </Field>
              </Col>

              <Col lg={8} md={12}>
                <Field label="Author" name="author" rules={[{ required: true, message: 'Author is required!' }]}>
                  <Select
                    showSearch
                    placeholder="Select Book"
                    optionFilterProp="children"
                    filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                    options={authors}
                  />
                </Field>
              </Col>

              <Col lg={8} md={12}>
                <Field label="Genre" name="genre">
                  <Input />
                </Field>
              </Col>

              <Col lg={8} md={12}>
                <Field label="Publication Date" name="publicationDate" className="w-100">
                  <DatePicker className="w-100" />
                </Field>
              </Col>
            </Row>

            <Row className="p-2">
              <Button type="primary" htmlType="submit" className="me-2">
                Submit
              </Button>
              <Button type="primary" ghost htmlType="button" onClick={() => {}}>
                Reset
              </Button>
            </Row>
          </Form>
        </>
      )}
    </>
  );
};

export default BookEntry;
