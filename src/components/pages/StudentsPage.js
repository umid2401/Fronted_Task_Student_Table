import React, {useEffect, useState} from 'react';
import {
    Modal, ModalBody, ModalFooter, ModalHeader,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane
} from "reactstrap";
import classnames from "classnames";
import axios from "axios";
import {URL} from '../../tools/const_url'
import Layout from "../layout/Layout";

import {Form, Input, Button, Checkbox, Select} from 'antd';
import {toast} from "react-toastify";

function StudentsPage(props) {
    // -------Const-----------------
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
    const [activeTab2, setActiveTab2] = useState('1');
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
    const [studentGroups, setStudentGroups] = useState([])
    // ------------------- End states ----------------------

    useEffect(() => {
        axios.get(URL + '/api/students/').then(resp => {
            setStudents(resp.data);
        });
        axios.get(URL + '/api/groups/').then(resp => {
            setGroups(resp.data);
        })
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
        axios.post(URL + '/api/students/', values)
            .then((res) => {
                    axios.get(URL + '/api/students/').then(resp => {
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
            let checkboxes = document.querySelectorAll('input.checkboxx-student')
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
            let checkboxes = document.querySelectorAll('input.checkboxx-student')
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
            let checkboxes = document.querySelectorAll('input.checkboxx-student')
            let deleted_students = deleteStudents.length
            let success_delete = false
            deleteStudents.map(student_id => {
                axios.delete(`http://localhost:8000/api/students/${student_id}/`)
                    .then(function (response) {
                        axios.get('http://localhost:8000/api/students/').then(resp => {
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
            setStudentGroups(students[index].group_names)
            console.log(studentGroups)
        }

        function editFuncEmplyee(values) {
            console.log(values, filter_student.id)
            axios.put(URL + `/api/students/${filter_student.id}/`, values)
                .then((res) => {
                        axios.get(URL + '/api/students/').then(resp => {
                            setStudents(resp.data);
                            toast.success("Talabani ma'lumotlari movofaqiyatli o'zgartirildi !!!!")
                        });
                    }
                )
                .catch(error => {
                    toast.error('Server bilan muammo yoki ma\'lumotlarni qaytadan kiriting !!!')
                })


        }


        return (
            <div>
                <Layout>
                    <div className="page-header">
                        <div className="container">
                            <div className="title">
                                Bizdagi talabalar
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
                                            Offline o'qiydigan talabalar
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
                                            Online o'qiydigan talabalar
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
                                                        {deletedCheckbox.length} ta tanlangan
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
                                                    F.I.Sh
                                                </div>
                                                <div className="item-he-G">
                                                    Telefon raqami
                                                </div>
                                                <div className="item-he-G">
                                                    Qaysi guruxlarda o'qiydi
                                                </div>
                                                <div className="item-he-G">
                                                    Ustozi kim
                                                </div>
                                                <div className="item-check">

                                                </div>
                                            </div>
                                            {students.map((item, index) => {
                                                return (
                                                    <div className="sec-header" key={index}>
                                                        <div className="item-check">
                                                            <input className="checkboxx-student" type="checkbox"
                                                                   defaultChecked={false}
                                                                   onChange={() => checkboxDeleteStudent(item.id, index)}/>
                                                        </div>
                                                        <div className="item-G">
                                                            {item.first_name} {item.last_name}
                                                        </div>
                                                        <div className="item-G">
                                                            {item.phone_number}
                                                        </div>
                                                        <div className="item-G">
                                                            {item.group_names.map(name => {
                                                                return <i> {name}, </i>
                                                            })}
                                                        </div>
                                                        <div className="item-G">
                                                            Azim aka
                                                        </div>

                                                        <div onClick={() => {
                                                            editFunc(item.id, index);
                                                            toggle3()
                                                        }} className="item-check">
                                                            <img src={process.env.PUBLIC_URL + '/imga/edit.png'} alt=""/>
                                                        </div>
                                                    </div>
                                                )
                                            })}


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
                        toggle={toggleDeleteModal}
                    >
                        <ModalHeader toggle={toggleDeleteModal}>
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
                                        label="First Name"
                                        name="first_name"
                                        rules={[{required: true, message: 'Iltimos First  Nameni kiriting !!!'}]}
                                    >
                                        <Input/>
                                    </Form.Item>

                                    <Form.Item
                                        label="Last Name"
                                        name="last_name"
                                        rules={[{required: true, message: 'Iltimos Last  Nameni kiriting !!!'}]}
                                    >
                                        <Input/>
                                    </Form.Item>


                                    <Form.Item
                                        label="Phone Number"
                                        name="phone_number"
                                        rules={[{required: true, message: 'Iltimos Phone numberni kiriting !!!'}]}
                                    >
                                        <Input/>
                                    </Form.Item>
                                    <Form.Item
                                        label="Group Name"
                                        name="group_names"
                                        rules={[{required: true, message: 'Iltimos guruh nomini kiriting'}]}
                                    >
                                        <Select
                                            placeholder="Guruhni tanlang"
                                            allowClear
                                        >
                                            {groups.map(group => {
                                                return <Option value={group.id}>{group.name}</Option>
                                            })}


                                        </Select>
                                    </Form.Item>
                                    <Form.Item name="gender" label="Gender" rules={[{required: true}]}>
                                        <Select
                                            placeholder="Jinsini kiriting "
                                            onChange={onGenderChange}
                                            allowClear
                                        >
                                            <Option value="Male">Erkak</Option>
                                            <Option value="Female">Ayol</Option>

                                        </Select>
                                    </Form.Item>


                                    <Form.Item
                                        label="Password"
                                        name="password"
                                        rules={[{required: true, message: 'Iltimos parol kiriting !!!'}]}
                                    >
                                        <Input.Password/>
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
                                Edit Student
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
                                        label="First Name"
                                        name="first_name"
                                        rules={[{required: true, message: 'Iltimos First  Nameni kiriting !!!'}]}
                                    >
                                        <Input/>
                                    </Form.Item>

                                    <Form.Item
                                        label="Last Name"
                                        name="last_name"
                                        rules={[{required: true, message: 'Iltimos Last  Nameni kiriting !!!'}]}
                                    >
                                        <Input/>
                                    </Form.Item>

                                    <Form.Item
                                        label="Phone Number"
                                        name="phone_number"
                                        rules={[{required: true, message: 'Iltimos Phone numberni kiriting !!!'}]}
                                    >
                                        <Input/>
                                    </Form.Item>
                                    <div style={{marginBottom:'20px'}}>
                                        <Nav tabs className="d-flex justify-content-center">
                                            <NavItem>
                                                <NavLink
                                                    className={classnames({ active: activeTab2 === '1' })}
                                                    onClick={() => { setActiveTab2('1'); }}
                                                >
                                                    Edit Group
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    className={classnames({ active: activeTab2 === '2' })}
                                                    onClick={() => { setActiveTab2('2'); }}
                                                >
                                                    Add new Group
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                    </div>
                                    <TabContent activeTab={activeTab2}>
                                        <TabPane tabId="1">
                                            <div className='row' >
                                                <div className='col-12'>
                                                    <Form.Item
                                                        label={<label style={{ color: "#dc3545" }}>Previous group</label>}
                                                        name="prev_group"
                                                        rules={[{required: (activeTab2 === '1') ? true : false, message: 'Iltimos guruh nomini kiriting'}]}
                                                    >
                                                        <Select
                                                            placeholder="Guruhni tanlang"
                                                            allowClear
                                                        >
                                                            {studentGroups.map(group => {
                                                                return <Option value={group}>{group}</Option>
                                                            })}
                                                        </Select>
                                                    </Form.Item>
                                                    <Form.Item
                                                        label={<label style={{ color: "#007bff" }}>Next group</label>}
                                                        name="next_group"
                                                        rules={[{required: (activeTab2 === '1') ? true : false, message: 'Iltimos guruh nomini kiriting'}]}
                                                    >
                                                        <Select
                                                            placeholder="Guruhni tanlang"
                                                            allowClear
                                                        >
                                                            {groups.map(group => {
                                                                return(
                                                                    (studentGroups.includes(group.name))
                                                                        ?
                                                                        ''
                                                                        :
                                                                        <Option value={group.id}>{group.name}</Option>
                                                                )
                                                            })}

                                                        </Select>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </TabPane>
                                        <TabPane tabId="2">
                                            <div className='row'>
                                                <div className="col-12">
                                                    <Form.Item
                                                        label={<label style={{ color: "#28a745" }}>New group</label>}
                                                        name="new_group"
                                                        rules={[{required: (activeTab2 === '2') ? true : false, message: 'Iltimos guruh nomini kiriting'}]}
                                                    >
                                                        <Select
                                                            placeholder="Guruhni tanlang"
                                                            allowClear
                                                        >
                                                            {groups.map(group => {
                                                                return(
                                                                    (studentGroups.includes(group.name))
                                                                        ?
                                                                        ''
                                                                        :
                                                                        <Option value={group.id}>{group.name}</Option>
                                                                )
                                                            })}

                                                        </Select>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </TabPane>
                                    </TabContent>

                                    <Form.Item name="gender" label="Gender" rules={[{required: true}]}>
                                        <Select
                                            placeholder="Bu yerga jinsingizni tanlab qo'ying "
                                            onChange={onGenderChange}
                                            allowClear
                                        >
                                            <Option value="Male">Erkak</Option>
                                            <Option value="Female">Ayol</Option>

                                        </Select>
                                    </Form.Item>


                                    <Form.Item
                                        label="Password"
                                        name="password"
                                        rules={[{required: true, message: 'Iltimos parol kiriting !!!'}]}
                                    >
                                        <Input.Password/>
                                    </Form.Item>


                                    <div className='d-flex justify-content-around'>
                                        <Button type="primary" htmlType="submit">
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
export default StudentsPage;