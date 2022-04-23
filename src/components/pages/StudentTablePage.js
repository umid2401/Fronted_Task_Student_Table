import React, { useState } from 'react';
import { Table, Switch } from 'antd';
import "../../style/student_TablePage.scss"
import { Modal, Button } from 'antd';

const columns = [
  {
    title: 'Full Name',
    width: 150,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: 'Age',
    width: 100,
    dataIndex: 'age',
    key: 'age',
    fixed: 'left',
  },
  {
    title: 'Column 1',
    dataIndex: 'address',
    key: '1',
    width: 150,
  },
  {
    title: 'Column 2',
    dataIndex: 'address',
    key: '2',
    width: 150,
  },
  {
    title: 'Column 3',
    dataIndex: 'address',
    key: '3',
    width: 150,
  },
  {
    title: 'Column 4',
    dataIndex: 'address',
    key: '4',
    width: 150,
  },
  {
    title: 'Column 5',
    dataIndex: 'address',
    key: '5',
    width: 150,
  },
  {
    title: 'Column 6',
    dataIndex: 'address',
    key: '6',
    width: 150,
  },
  {
    title: 'Column 7',
    dataIndex: 'address',
    key: '7',
    width: 150,
  },
  { title: 'Column 8', dataIndex: 'address', key: '8' },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    
    render: () => <a>action</a>,
  },
];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

const StudentTablePage = () => {
  const [fixedTop, setFixedTop] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
      <div className='studentTable'>
          

          <Table
      columns={columns}
      dataSource={data} 
      scroll={{ x: 1500 }}
      summary={pageData => (
        <Table.Summary  fixed={fixedTop ? 'top' : 'bottom'}>
          <Table.Summary.Row  >
            {/* <Table.Summary.Cell index={0} colSpan={2}>
              <Switch
                checkedChildren="Fixed Top"
                unCheckedChildren="Fixed Top"
                checked={fixedTop}
                
                onChange={() => {
                  setFixedTop(!fixedTop);
                }}
              />
            </Table.Summary.Cell> */}
            {/* <Table.Summary.Cell index={2} colSpan={8}>
            </Table.Summary.Cell>        */}
                 {/* <Table.Summary.Cell index={10}></Table.Summary.Cell> */}
          </Table.Summary.Row>
        </Table.Summary>
      )}
      sticky
    />
<div>
<Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <p>assalomu alayko'm</p>
<Modal  title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
</div>
    
    </div>
   
  );
};

export default StudentTablePage;