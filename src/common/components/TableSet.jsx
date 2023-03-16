import { Card, Table, Button, Row, Col } from 'antd';
import { useState } from 'react';
import DebouncedSearchInput from './DebouncedSearchInput';

const TableSet = (props) => {
  const { data, columns, title, totalRows, pageSize, setPageSize, pageNo, setPageNo, setQuery, queryPlaceholder, onCreate } =
    props;

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const pagination = {
    total: totalRows,
    current: pageNo,
    pageSize: pageSize,
    defaultPageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ['2', '5', '10', '20', '30']
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      console.log('selectedRowKeys changed: ', newSelectedRowKeys);
      setSelectedRowKeys(newSelectedRowKeys);
    },
    type: 'checkbox'
  };

  const onChange = (pagination, filters, sorter, extra) => {
    setPageNo(pagination.current);
    setPageSize(pagination.pageSize);
    setSelectedRowKeys([]);
    console.log(pagination, filters, sorter, extra);
  };

  return (
    <>
      <div>
        <Card>
          <h2 className="mb-3">{title}</h2>
          <Row className="mb-2">
            <Col md={12}>
              <DebouncedSearchInput placeholder={queryPlaceholder || 'Search'} onChange={setQuery} />
            </Col>
            <Col md={12} className="text-end" style={{ display: !onCreate ? 'none' : '' }}>
              <Button type="primary" size="middle" onClick={onCreate ? onCreate : void 0}>
                Create New
              </Button>
            </Col>
          </Row>
          <Table
            columns={columns}
            dataSource={data?.map((row, i) => ({ ...row, key: i })) || []}
            pagination={pagination}
            rowSelection={rowSelection}
            onChange={onChange}
            size="middle"
          />
        </Card>
      </div>
    </>
  );
};

export default TableSet;
