import React from 'react';
import { Table } from 'antd';
import {CustomTableProps} from './Table.d';


export default function CustomTable({ columns, data }: CustomTableProps): JSX.Element {
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      style={{ background: 'rgba(16, 186, 172, 1)' }} // Set the background color of the table header
    />
  );
}
