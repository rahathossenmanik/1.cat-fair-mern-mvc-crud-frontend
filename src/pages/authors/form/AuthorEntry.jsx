import axios from 'axios';
import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import { Button, Col, DatePicker, Form, Input, Row } from 'antd';
const Field = Form.Item;

const AuthorEntry = () => {
  const {
    state: { author }
  } = useLocation();
  const authorId = author?._id;
  const [redirect, setRedirect] = useState(false);

  const initialValues = {
    givenName: author?.givenName || '',
    lastName: author?.lastName || '',
    country: author?.country || '',
    birthdate: dayjs(author?.birthdate) || ''
  };

  const onFinish = (values) => {
    const payload = { ...values, birthdate: values?.birthdate?.$d };
    console.log(payload);
    try {
      authorId
        ? axios.put(process.env.REACT_APP_API_BASE + `/api/authors/${authorId}`, {
            ...payload,
            _id: authorId
          })
        : axios.post(process.env.REACT_APP_API_BASE + '/api/authors', payload);
      setRedirect(true);
    } catch (error) {
      alert('An Error Occured');
    }
  };

  return (
    <>
      {redirect ? (
        <Navigate to="/authors" push />
      ) : (
        <>
          <Form initialValues={initialValues} onFinish={onFinish} autoComplete="off" layout="vertical">
            <Row>
              <Col lg="8" md="12" className="p-2">
                <Field
                  label="First Name"
                  name="givenName"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your first name!'
                    }
                  ]}>
                  <Input />
                </Field>
              </Col>

              <Col lg="8" md="12" className="p-2">
                <Field
                  label="Last Name"
                  name="lastName"
                  rules={[{ required: true, message: 'Please input your last name!' }]}>
                  <Input />
                </Field>
              </Col>

              <Col lg="8" md="12" className="p-2">
                <Field label="Country" name="country">
                  <Input />
                </Field>
              </Col>

              <Col lg="8" md="12" className="p-2">
                <Field label="Date of Birth" name="birthdate">
                  <DatePicker />
                </Field>
              </Col>
            </Row>

            <Row className="p-2">
              <Button type="primary" htmlType="submit" className="me-2">
                Submit
              </Button>
            </Row>
          </Form>
        </>
      )}
    </>
  );
};

export default AuthorEntry;
