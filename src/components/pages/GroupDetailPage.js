import React, {useEffect, useState} from 'react';
import Layout from "../layout/Layout";
import {Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap";
import classnames from "classnames";
import {Form, Select} from "antd";
import axios from "axios";
import {URL} from "../../tools/const_url";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import {log10} from "chart.js/helpers";

function GroupDetailPage(props) {
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

    //--------Redux------------



    //--------End Redux--------

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
    const group_id = useSelector(state => state.groupDetail.group_id)
    console.log(group_id)
   useEffect(()=>{
       axios.get(URL + `/api/student-group/?group=${group_id}`).then(resp => {
           setStudents(resp.data);
       });
   },[])






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
                                                        {item.name}
                                                    </div>
                                                    <div className="item-G">
                                                        {item.phone_number}
                                                    </div>
                                                    <div className="item-G">

                                                    </div>
                                                    <div className="item-G">
                                                        Azim aka
                                                    </div>

                                                    <div className="item-check">
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

            </Layout>
        </div>
    );
}

export default GroupDetailPage;