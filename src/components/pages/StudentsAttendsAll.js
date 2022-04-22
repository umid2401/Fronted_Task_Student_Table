import React, {useEffect, useState} from 'react';
import {Form, Select, Table} from 'antd';
import axios from "axios";
import {URL} from "../../tools/const_url";

function StudentsAttendsAll(props) {



    const [listgroup, setListGroup] = useState([])
    useEffect(() => {
        axios.get(URL + '/api/groups/')
            .then((res) => {
                setListGroup(res.data)
            })
    }, [])
    const [listattends, SetlistAttend] = useState([])
    const [listStudent, setListStudent] = useState([])
    const lessonSelect = (value) => {
        axios.get(URL + `/api/lessons/?group=${value}`)
            .then((res) => {
                SetlistAttend(res.data)


            })
        axios.get(URL + `/api/student-group/?group=${value}`)
            .then((res) => {
                setListStudent(res.data)

            })
    }
    const columns = [
        {
            title: 'Full Name',
            width: 200,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
        },

    ];
    if (listStudent){
        listStudent.map((item,index)=>{
            columns.push(
                {
                    title: `${item.name}`,
                    dataIndex: 'address',
                    key: `${index+1}`,
                    width: 150,
                }
            )

        })
    }
    const data = [];
    if (listattends) {
        listattends.map((item, index) => {
            axios.get(URL + `/api/attends/?lesson=${item.id}`)
                .then((res) => {
                    let a=res.data
                   a.map((item,index)=>(
                        data.push({
                            key: {index},
                            name: `${item.attend_status}`,
                        })
                    ))
                })
        })
    }
    // for (let i = 0; i < 100; i++) {
    //     data.push({
    //         key: i,
    //         name: `Edrward ${i+1}`,
    //         age: 32,
    //         address: `London Park no. ${i+2}`,
    //     });
    // }
    return (
        <div>
            <div className="row">
                <div className="row">
                    <div className="col-md-12 col-lg-12 col-12 col-sm-12">
                        <h5>Guruhni tanlang</h5>
                        <Form
                            labelCol={{span: 12}}
                            wrapperCol={{span: 14}}
                            layout="horizontal"
                            className='form-control'

                        >
                            <Select className='form-control' onChange={(e) => lessonSelect(e)}>
                                {listgroup.map((lesson, index) => {
                                    return <Select.Option key={index}
                                                          value={lesson.id}>{lesson.name}</Select.Option>
                                })}
                            </Select>
                        </Form>
                    </div>

                </div>

            </div>
            <div className='mt-3'>
                <Table columns={columns} dataSource={data} scroll={{x: 1500, y: 400}}/>,
            </div>

        </div>
    );
}

export default StudentsAttendsAll;