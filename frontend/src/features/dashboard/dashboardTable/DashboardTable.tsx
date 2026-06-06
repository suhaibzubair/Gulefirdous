import React from 'react';
import { Table, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {DashboardTableProps} from './DashboardTable.d';
import "./DashboardTable.scss";


const DashboardTable: React.FC<DashboardTableProps> = () => {
  const columns = [
    {
      title: 'School',
      dataIndex: 'school',
      key: 'school',
      
    },
    {
      title: 'Company Name',
      dataIndex: 'companyName',
      key: 'companyName',
    },
    {
      title: 'Company Address',
      dataIndex: 'companyAddress',
      key: 'companyAddress',
    },
    {
      title: 'VAT Number',
      dataIndex: 'vatNumber',
      key: 'vatNumber',
    },
    {
      title: 'Email Address',
      dataIndex: 'emailAddress',
      key: 'emailAddress',
    },
    {
      title: 'Current Plan',
      dataIndex: 'currentPlan',
      key: 'currentPlan',
    },
    {
      title: 'Billing Period',
      dataIndex: 'billingPeriod',
      key: 'billingPeriod',
    },
    {
      title: 'Main Workspace',
      dataIndex: 'mainWorkspace',
      key: 'mainWorkspace',
    },
    {
      title: 'Package Details',
      dataIndex: 'packageDetails',
      key: 'packageDetails',
      render: (text: string, record: any) => ( // Provide the correct types
        <>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record.key)}>
            Edit
          </Button>
          <ul>
            {record.packageDetails.map((item: string, index: number) => ( // Provide the correct types
              <li key={index}>{item}</li>
            ))}
          </ul>
        </>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  const data = [
    {
      key: '1',
      school: 'My Start Up project',
      companyName: 'MAHZA',
      companyAddress: '2F Gulberg Lahore, Pakistan',
      vatNumber: 'FR345326',
      emailAddress: 'bravo@outlook.com',
      currentPlan: 'Trial session',
      billingPeriod: 'start 9/8/23  End 9/9/23',
      mainWorkspace: 'Link',
      packageDetails: ['Item 1', 'Item 2', 'Item 3'],
      status: 'Active',
    },
  ];

  const handleEdit = (key: string) => {
    // Implement edit functionality here
  };

  const handleEditClick = () => {
    // Define the edit action here
    console.log('Edit button clicked');
  };

  const handleDeleteClick = () => {
    // Define the delete action here
    console.log('Delete button clicked');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Button onClick={handleEditClick} style={{ background: 'transparent' }}>
          <EditOutlined /> Edit Information
        </Button>
        <Button onClick={handleDeleteClick} style={{ background: 'transparent' }}>
          Delete Information<DeleteOutlined />
        </Button>
      </div>
      <Table columns={columns} dataSource={data} bordered pagination={false} />
    </div>
  );
};

export default DashboardTable;
