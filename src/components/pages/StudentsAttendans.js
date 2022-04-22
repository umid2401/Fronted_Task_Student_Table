import React, {useEffect, useState} from 'react';
import Layout from "../layout/Layout";
import {Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap";
import classnames from "classnames";
import {Button, Form, Input, Select} from "antd";
import axios from "axios";
import {URL} from '../../tools/const_url'
import {toast} from "react-toastify";
import {selectOptions} from "@testing-library/user-event/dist/select-options";
import StudentsAttendsAll from "./StudentsAttendsAll";
import StudentTablePage from './StudentTablePage';

function StudentsAttendans(props) {

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }
    const [isChecked, setIsChecked] = useState(false);
    const [activeTab, setActiveTab] = useState('1');
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };

    // -------------------Group-------------------------------
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
                SetattendResult(!attendresult)
            })
        axios.get(URL + `/api/student-group/?group=${value}`)
            .then((res) => {
                setListStudent(res.data)
                SetattendResult(!attendresult)

            })
    }
    const [attendresult, SetattendResult] = useState(false)
    const [getListattends, setGetAttends] = useState([])
    const [lessonID, setLessonID] = useState(null)
    const getStudentHomeworks = (value) => {
        if (value) {
            SetattendResult(true)
            setLessonID(value)
            setGetAttends([])
            axios.get(URL + `/api/attends/?lesson=${value}`)
                .then((res) => {
                    setGetAttends(res.data)
                })
        }
    }
console.log(getListattends)

    const {Option} = Select;
    const [form] = Form.useForm();
    const onFinish = (values) => {

    };
    const onFinishFailed = (errorInfo) => {

    };
    const onFinish1 = (values) => {

    };
    const onFinishFailed1 = (errorInfo) => {

    };
    const onGenderChange = (value, id, sid, time) => {
        console.log(value, id, lessonID, time, sid)
        let attendt_result = {
            attend_status: value,
            student: id,
            lesson: lessonID,
            data_time: time,
        }
        axios.put(URL + `/api/attends/${sid}/`, attendt_result)
            .then((res) => {

                axios.get(URL + `/api/attends/?lesson=${lessonID}`)
                    .then((res2) => {
                        setGetAttends(res2.data)

                    })
                    .catch((error1) => {
                        toast.error1('Server bilan muammo bor1 !!!')
                    })
            })

            .catch((error) => {
                toast.error('Server bilan muammo bor2 !!!')
            })
    };
    const onGenderChange1 = (value, id) => {
        let attendt_result = {
            attend_status: value,
            student: id,
            lesson: lessonID,

        }
        axios.post(URL + '/api/attends/', attendt_result)
            .then((res) => {
                axios.get(URL + `/api/attends/?lesson=${lessonID}`)
                    .then((res2) => {
                        setGetAttends(res2.data)

                    })
                    .catch((error1) => {
                        toast.error1('Server bilan muammo bor1 !!!')
                    })
            })

            .catch((error) => {
                toast.error('Server bilan muammo bor2 !!!')

            })

    };


    return (
        <div>
            <Layout>


                <div className="page-header">
                    <div className="container">
                        <div className="text-header">
                            <div className="page-title">
                                Bizda o’qiydigan talabalar davomati
                            </div>
                            <div className="addpage-button">
                                <img src={process.env.PUBLIC_URL + '/imga/pluss.png'} alt=""/>
                                <div className="center-title">
                                    Guruh qo'shish
                                </div>
                            </div>
                        </div>
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={classnames({active: activeTab === '1'})}
                                    onClick={() => {
                                        toggle('1');
                                    }}
                                >
                                    <div className="circle">
                                        Guruhlar
                                    </div>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({active: activeTab === '2'})}
                                    onClick={() => {
                                        toggle('2');
                                    }}
                                >
                                    <div className="circle">
                                        Guruhlarning hammasi
                                    </div>
                                </NavLink>
                            </NavItem>


                        </Nav>

                        <div className="tab-body">
                            <TabContent activeTab={activeTab}>
                                <TabPane tabId="1">
                                    <div className="tab-detail">
                                        <div className="check-item">
                                            <div className="sec-4">

                                            </div>
                                            <div className="sec-5">
                                                <img src={process.env.PUBLIC_URL + '/imga/plus.png'} alt=""/>
                                                <div className="title">
                                                    Keyingisini yaratish
                                                </div>
                                            </div>
                                        </div>
                                        <div className="check-item-sec">
                                            <div className="sec-3">
                                                <img src={process.env.PUBLIC_URL + '/imga/cal.png'} alt=""/>
                                                <div className="title">
                                                    11-08-22
                                                </div>
                                            </div>
                                            <div className="text">
                                                To
                                            </div>
                                            <div className="sec-3">
                                                <img src={process.env.PUBLIC_URL + '/imga/cal.png'} alt=""/>
                                                <div className="title">
                                                    11-08-22
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-sec-body">
                                        <div className="row">
                                            <div className="row">
                                                <div className="col-md-10 col-lg-10 col-12 col-sm-12">
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
                                            {/*<div className="row">*/}
                                            {/*    <div className="col-md-10 col-lg-10 col-12 col-sm-12">*/}
                                            {/*        <h5 className='mt-2'>Dras kunini belgilang </h5>*/}
                                            {/*        <Select   allowClear={true} className='form-control'  onChange={e=> {*/}
                                            {/*            getStudentHomeworks(e);*/}
                                            {/*        }} >*/}
                                            {/*            {homeWorks.map((homework,index)=>{*/}
                                            {/*                return <Select.Option key={index} value={homework.id}>{homework.title}</Select.Option>*/}
                                            {/*            })}*/}
                                            {/*        </Select>*/}
                                            {/*    </div>*/}
                                            {/*    <div className="col-md-2 col-lg-2 col-6 col-sm-6 d-flex align-items-end">*/}
                                            {/*        <button className={(lesson > 0) ? 'btn btn-success text-center text-white btn-block':'btn btn-success text-center text-white btn-block disabled'} onClick={toggleHomework}>Add Homework</button>*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}
                                        </div>
                                        <div className="row">
                                            <div className="col-md-10 col-lg-10 col-12 col-sm-12">
                                                <h5 className='mt-2'>Lessonni tanlang</h5>
                                                <Select allowClear={true} className='form-control' onChange={e => {
                                                    getStudentHomeworks(e);
                                                }}>
                                                    {listattends.map((homework, index) => {
                                                        return <Select.Option key={index}
                                                                              value={homework.id}>{homework.name}</Select.Option>
                                                    })}
                                                </Select>
                                            </div>

                                        </div>
                                        <div className="sec-header mt-3">
                                            <div className="item-check_1">
                                                <img src="/imga/ttt.png" alt=""/>
                                            </div>
                                            <div className="item-he-header">
                                                Ism Familyasi
                                            </div>
                                            <div className="item-he-D">
                                                Davomat holati
                                            </div>


                                        </div>
                                        {
                                            listStudent.map((list, index) => (
                                                <div className="sec-header">
                                                    <div className="item-check_1">
                                                        <img src="/imga/ttt.png" alt=""/>
                                                    </div>
                                                    <div className="item-he-header">
                                                        {list.name}
                                                    </div>


                                                    {
                                                        getListattends.find(item => item.student === list.id)
                                                            ?
                                                            <div className="item-he-D">
                                                                <div className="he">
                                                                    <Form
                                                                        name="basic"
                                                                        labelCol={{span: 8}}
                                                                        wrapperCol={{span: 16}}
                                                                        initialValues={{remember: true}}
                                                                        onFinish={onFinish}
                                                                        onFinishFailed={onFinishFailed}
                                                                        autoComplete="off"

                                                                    >
                                                                        <Select
                                                                            placeholder="Davomat holatini belgilang"
                                                                            allowClear
                                                                            defaultValue={getListattends.find(item => item.student === list.id).attend_status}
                                                                            onChange={(e) => onGenderChange(e, getListattends.find(item => item.student === list.id).student, getListattends.find(item => item.student === list.id).id, getListattends.find(item => item.student === list.id).data_time)}

                                                                        >

                                                                            return <Option
                                                                            value='Sababli'>Sababli</Option>
                                                                            return <Option value='Keldi'>Keldi</Option>
                                                                            return <Option
                                                                            value='Kelmadi'>Kelmadi</Option>


                                                                        </Select>
                                                                    </Form>
                                                                </div>

                                                            </div>
                                                            :
                                                            <div className="item-he-D d-flex justify-content-around">

                                                                <Form
                                                                    name="basic"
                                                                    labelCol={{span: 8}}
                                                                    wrapperCol={{span: 16}}
                                                                    initialValues={{remember: true}}
                                                                    onFinish={onFinish1}
                                                                    onFinishFailed={onFinishFailed1}
                                                                    autoComplete="off"

                                                                >
                                                                    <Select
                                                                        placeholder="Davomat holatini belgilang"
                                                                        allowClear
                                                                        onChange={(e) => onGenderChange1(e, list.id)}

                                                                    >

                                                                        return <Option Selected
                                                                                       value='Sababli'>Sababli</Option>
                                                                        return <Option value='Keldi'>Keldi</Option>
                                                                        return <Option value='Kelmadi'>Kelmadi</Option>


                                                                    </Select>
                                                                </Form>
                                                            </div>
                                                    }


                                                </div>
                                            ))
                                        }

                                    </div>
                                </TabPane>
                                <TabPane tabId="2">
                                    <div className="tab-sec-body">
                                        <StudentsAttendsAll/>
                                    </div>
                                </TabPane>
                            </TabContent>
                        </div>
                <StudentTablePage/>

                    </div>
                </div>

            </Layout>
        </div>
    );
}

export default StudentsAttendans;