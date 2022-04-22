import React, {useEffect, useState} from 'react';
import Layout from "../layout/Layout";
import {Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap";
import classnames from "classnames";
import '../../style/courses.scss'
import axios from "axios";
import {options, URL} from '../../tools/const_url'
import {
    Modal, ModalBody, ModalFooter, ModalHeader,

} from "reactstrap";

import {Button, Form, Input, Select} from "antd";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {groupId} from "../../redux/actions/groupdetailactions";
function GroupsPage(props) {
    const {Option} = Select;
    const [form] = Form.useForm();
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };
    //--------End const-------------

    // ----------------- States -------------------------
    const [activeTab, setActiveTab] = useState('1');
    const [students, setStudents] = useState([])
    const [deleteStudents, setDeleteStudents] = useState([])
    const [deletedCheckbox, setDeletedCheckbox] = useState([])
    const [groups, setGroups] = useState([])
    const [modal2, setModal2] = React.useState(false);
    const [deleteModal, setDeleteModal] = useState(false)
    const [filter_student, SetFilterstudent] = useState([])
    const [editedIndex, Setindex] = useState(-1)
    const [modal, setModal] = useState(false)
    const [modal3, setModalEdit] = useState(false)

    // ------------------- End states ----------------------

    useEffect(() => {
        axios.get( URL + '/api/groups/',options)
            .then(resp => {
            setStudents(resp.data);
        })
            .catch((error) => {
            console.log(error)})


    }, []);

    //------------Functions----------------------------------
    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }


    // Toggle for Modal
    const toggle1 = () => {
        setModal2(!modal2)

    }

    const onFinish = (values) => {
        console.log(values)
        axios.post(URL + '/api/groups/', values, options)
            .then((res) => {
                    axios.get(URL + '/api/groups/', options).then(resp => {
                        setStudents(resp.data);
                        toast.success("Yangi talaba yaratildi !!!!")
                    });
                }
            )
            .catch(error => {
                toast.error('Server bilan muammo yoki ma\'lumotlarni qaytadan kiriting !!!')
            })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onGenderChange = (value) => {
        switch (value) {
            case 'male':
                form.setFieldsValue({note: 'Hi, man!'});
                return;
            case 'female':
                form.setFieldsValue({note: 'Hi, lady!'});
                return;

        }
    };

    const toggleModal = () => {
        setModal(!modal)
    }
    const toggle3 = () => {
        setModalEdit(!modal3)
    }
    const toggleDeleteModal = () => {
        if (deleteStudents.length !== 0) {
            setDeleteModal(!deleteModal)
        }
    }

    // ---------------------Delete students--------------------
    const checkboxDeleteStudentAll = (e) => {
        let checkboxes = document.querySelectorAll('input.checkboxx-group')
        let result = []
        if (e.currentTarget.checked) {
            students.map(student => {
                result.push(student.id)
            })
            checkboxes.forEach(item => {
                item.checked = true
            })
        } else {
            checkboxes.forEach(item => {
                item.checked = false
            })
            result = []
        }
        setDeleteStudents(result)
    }
    const checkboxDeleteStudent = (id, index) => {
        let checkboxes = document.querySelectorAll('input.checkboxx-group')
        deletedCheckbox.push(index)
        let arr = deleteStudents
        console.log(checkboxes[index].checked)
        if (checkboxes[index].checked === true) {
            deleteStudents.push(id)
        } else {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === id) {
                    arr.splice(i, 1);
                }
            }
            setDeleteStudents(arr)
        }
        console.log(deleteStudents)

    }


    const deleteStudentsButton = () => {
        let checkboxes = document.querySelectorAll('input.checkboxx-group')
        let deleted_students = deleteStudents.length
        let success_delete = false
        deleteStudents.map(student_id => {
            axios.delete(URL + `/api/groups/${student_id}/`, options)
                .then(function (response) {
                    axios.get(URL + '/api/groups/', options).then(resp => {
                        setStudents(resp.data);
                    })
                })
                .catch(function (error) {
                    console.log(error);
                    success_delete = false
                });
        })
        setDeleteStudents([])
        deletedCheckbox.map(index => {
            checkboxes[index].checked = false
        })
        toggleDeleteModal()
    }


    function editFunc(id, index) {
        SetFilterstudent(students[index])


    }

    function editFuncEmplyee(values) {
        console.log(values, filter_student.id)
        axios.put(URL + `/api/groups/${filter_student.id}/`, values)
            .then((res) => {
                    axios.get(URL + '/api/groups/').then(resp => {
                        setStudents(resp.data);
                        toast.success("Talabani ma'lumotlari movofaqiyatli o'zgartirildi !!!!")
                    });
                }
            )
            .catch(error => {
                toast.error('Server bilan muammo yoki ma\'lumotlarni qaytadan kiriting !!!')
            })


    }
    const dispatch=useDispatch()
    let group_id=useSelector(state => state.groupDetail.group_id)
    function getFuncList(id) {
        dispatch(groupId(id))
    }
    return (
        <div>
            <Layout>


                <div className="page-header">
                    <div className="container">

                        <div className="category_add">
                            <div className="row">
                                <div className="col-md-3 col-3 col-sm-6 col-12">
                                    <div className="cat-card">
                                        <img src={process.env.PUBLIC_URL + '/imga/vue.png'} alt=""/>
                                        <div className="group-name">
                                            Vue g26
                                        </div>
                                        <div className="group-items">
                                            15 guruh
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 col-3 col-sm-6 col-12">
                                    <div className="cat-card">
                                        <img src={process.env.PUBLIC_URL + '/imga/react.png'} alt=""/>
                                        <div className="group-name">
                                            Vue g26
                                        </div>
                                        <div className="group-items">
                                            15 guruh
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 col-3 col-sm-6 col-12">
                                    <div className="cat-card">
                                        <img src={process.env.PUBLIC_URL + '/imga/react.png'} alt=""/>
                                        <div className="group-name">
                                            Vue g26
                                        </div>
                                        <div className="group-items">
                                            15 guruh
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 col-3 col-sm-6 col-12">
                                    <div className="cat-card">
                                        <img src={process.env.PUBLIC_URL + '/imga/robo.png'} alt=""/>
                                        <div className="group-name">
                                            Vue g26
                                        </div>
                                        <div className="group-items">
                                            15 guruh
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-3 col-3 col-sm-6 col-12">
                                    <div className="cat-card-add">
                                        <div className="center-page">
                                            <img src={process.env.PUBLIC_URL + '/imga/pluss.png'} alt=""/>
                                            <div className='title'>
                                                Yangi category
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="title">
                            Bizning guruhlarimiz
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
                                        Offline kusrlar
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
                                        Online kusrlar
                                    </div>
                                </NavLink>
                            </NavItem>

                        </Nav>
                        <div className="tab-body">
                            <TabContent activeTab={activeTab}>
                                <TabPane tabId="1">
                                    <div className="tab-detail">
                                        <div className="check-item">
                                            <div className="sec">
                                                <input type="checkbox"
                                                       onClick={(event) => checkboxDeleteStudentAll(event)}/>
                                                <div className="title-check">
                                                    4 ta tanlangan
                                                </div>
                                            </div>

                                            <div className="sec-1" onClick={() => toggleDeleteModal()}>
                                                <img src={process.env.PUBLIC_URL + '/imga/delet.png'} alt=""/>
                                                <div className="title">
                                                    O'chirish
                                                </div>
                                            </div>
                                            <div className="sec-2" onClick={toggle1}>
                                                <img src={process.env.PUBLIC_URL + '/imga/plus.png'} alt=""/>
                                                <div className="title">
                                                    Qo'shish
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
                                        <div className="sec-header">
                                            <div className="item-check">

                                            </div>
                                            <div className="item-he-G">
                                                Guruhlar
                                            </div>
                                            <div className="item-he-G">
                                                Dars vaqti
                                            </div>
                                            <div className="item-he-G">
                                                Start time
                                            </div>
                                            <div className="item-he-G">
                                                O'quvchilar soni
                                            </div>
                                            <div className="item-check">

                                            </div>
                                        </div>
                                        {
                                            students.map((item,index)=>(
                                                <div className="sec-header">
                                                    <div className="item-check">
                                                        <input className="checkboxx-group" type="checkbox"
                                                               defaultChecked={false}
                                                               onChange={() => checkboxDeleteStudent(item.id, index)}/>
                                                    </div>
                                                    <div className="item-G">
                                                        <Link onClick={()=>getFuncList(item.id)}  to='/group-detail'>
                                                            {item.name}
                                                        </Link>

                                                    </div>
                                                    <div className="item-G">

                                                    </div>
                                                    <div className="item-G">
                                                        2021-08-14
                                                    </div>
                                                    <div className="item-G">
                                                        {item.students_count}
                                                    </div>
                                                    <div onClick={() => {
                                                        editFunc(item.id, index);
                                                        toggle3()
                                                    }} className="item-check">
                                                        <img src={process.env.PUBLIC_URL + '/imga/edit.png'} alt=""/>
                                                    </div>
                                                </div>
                                            ))
                                        }



                                    </div>
                                </TabPane>
                                <TabPane tabId="2">
                                    <div className="tab-section">
                                        Android Devoloper
                                    </div>
                                    <div className="tab-ul">
                                        <ul>
                                            <li> Shu sohada 2 yillik tajriba</li>
                                            <li> Shu sohada 2 yillik tajriba</li>
                                            <li> Shu sohada 2 yillik tajriba</li>
                                            <li> Shu sohada 2 yillik tajriba</li>
                                            <li> Redux / Mobx / RxJS arxitekturasini ishlash tajribasi va
                                                tushunchasi (kamida 2 yil)
                                            </li>
                                            <li> Shu sohada 2 yillik tajriba</li>
                                        </ul>
                                    </div>
                                </TabPane>
                            </TabContent>
                        </div>

                    </div>
                </div>
                <Modal
                    isOpen={deleteModal}
                    centered
                    fullscreen="sm"
                    size="sm"
                    toggle={function noRefCheck() {
                    }}
                >
                    <ModalHeader toggle={function noRefCheck() {
                    }}>
                        Ogohlantrish
                    </ModalHeader>
                    <ModalBody>
                        Siz {deleteStudents.length} ta talabani o'chirmoqchimisz?
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="danger"
                            onClick={deleteStudentsButton}
                        >
                            Ochirish
                        </Button>
                        {' '}
                        <Button onClick={toggleDeleteModal}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </Layout>
            <Modal isOpen={modal2}
                   toggle={toggle1}
            >
                <ModalBody>
                    <div className="card">
                        <div className="card-header text-white text-center bg-dark">
                            Add Student
                        </div>
                        <div className="card-body">
                            <Form
                                name="basic"
                                labelCol={{span: 8}}
                                wrapperCol={{span: 16}}
                                initialValues={{remember: true}}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                            >
                                <Form.Item
                                    label="Group Name"
                                    name='name'
                                    rules={[{required: true, message: 'Iltimos First  Nameni kiriting !!!'}]}
                                >
                                    <Input/>
                                </Form.Item>




                                <div className='d-flex justify-content-around'>
                                    <Button type="primary" htmlType="submit" onClick={toggle1}>
                                        Saqlash
                                    </Button>

                                    <Button type="danger" onClick={toggle1}>
                                        Chiqish
                                    </Button>
                                </div>


                            </Form>
                        </div>

                    </div>
                </ModalBody>
            </Modal>
            <Modal isOpen={modal3}
                   toggle={toggle3}
            >
                <ModalBody>
                    <div className="card">
                        <div className="card-header text-white text-center bg-dark">
                            Add Student
                        </div>
                        <div className="card-body">
                            <Form
                                name="basic"
                                labelCol={{span: 8}}
                                wrapperCol={{span: 16}}
                                initialValues={filter_student}
                                onFinish={editFuncEmplyee}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"

                            >
                                <Form.Item
                                    label="Group Name"
                                    name="name"
                                    rules={[{required: true, message: 'Iltimos First  Nameni kiriting !!!'}]}
                                >
                                    <Input/>
                                </Form.Item>




                                <div className='d-flex justify-content-around'>
                                    <Button type="primary" htmlType="submit" onClick={toggle3}>
                                        Saqlash
                                    </Button>

                                    <Button type="danger" onClick={toggle3}>
                                        Chiqish
                                    </Button>
                                </div>

                            </Form>
                        </div>

                    </div>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default GroupsPage;