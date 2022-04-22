import React, {useEffect, useState} from 'react';
import '../../../style/studentsec.scss'
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {URL} from "../../../tools/const_url";
import {InboxOutlined} from "@ant-design/icons";
import {Modal, ModalBody} from "reactstrap";
import {Button, Form, Input, message, Upload} from "antd";
import {toast} from "react-toastify";
import {fileToggle} from "../../../redux/actions/groupdetailactions";

function TabSec4(props) {
    const [file, setFile] = useState([])
    const [studentupload, setStudentUpload] = useState([])
    let lesson_id = useSelector(state => state.video_id.video_id_lesson)


    useEffect(() => {
        axios.get(URL + `/api/homework/?lesson=${lesson_id}`)
            .then((res) => {
                setFile(res.data)
            })
        axios.get(URL + '/api/student-upload/')
            .then((res) => {
                setStudentUpload(res.data)
            })
    }, [lesson_id])
    const [modal3, setModalEdit] = useState(false)
    const [modal4, setModalEdit1] = useState(false)
    const [fileid, setFileId] = useState(null)
    const [message, setMessage] = useState(null)
    const [uploadID, SetUploadID] = useState(null)
    const toggle3 = (id) => {
        setFileId(id)
        setModalEdit(!modal3)
    }
    const toggle4 = (id, uploadId) => {
        setFileId(id)
        SetUploadID(uploadId)
        setModalEdit1(!modal4)
    }
    let student_id=useSelector(state => state.studentDetail.student_id)
    const [message_file, setFileData] = useState()
    const [message_file1, setFileData1] = useState()

    const uploadFile = () => {
        const formData = new FormData()
        formData.append('file', message_file)
        formData.append('homework', fileid)
        formData.append('student', student_id)
        axios.post(URL + '/api/student-upload/', formData)
            .then((res) => {
                axios.get(URL + '/api/student-upload/')
                    .then((res) => {
                        setStudentUpload(res.data)
                    })
                toast.success('File yuklandi')

            })
            .catch((error) => {
                toast.error('File yuklanmadi ')
            })
    }
    const uploadFile1 = () => {
        const formData = new FormData()
        console.log(message_file1, fileid, student_id, uploadID)
        formData.append('file', message_file1)
        formData.append('homework', fileid)
        formData.append('student', student_id)
        axios.put(URL + `/api/student-upload/${uploadID}/`, formData)
            .then((res) => {
                axios.get(URL + '/api/student-upload/')
                    .then((res) => {
                        setStudentUpload(res.data)
                    })
                toast.success('File o\'zagartirildi')

            })
            .catch((error) => {
                toast.error('File yuklanmadi ')
            })
    }
    const [upload, Setupload] = useState(
        true
    )


    return (
        <div>
            <div className="tab-item_3">

                {
                    file.map((student, index) => (

                        <div className="items">
                            <a href={student.work_file}>
                                <div className="lesson-lokat">
                                    <div className="lesson-logo">
                                        <img src={process.env.PUBLIC_URL + '/images/ss.jpg'}/>
                                    </div>
                                    <div className="lesson-name">
                                        <div className="name-item-1">
                                            {student.title}
                                        </div>
                                        <div className="name-item-2">
                                            4.0 MG | 20.06.2019
                                        </div>
                                    </div>
                                </div>
                            </a>

                            {
                                studentupload.find(item => item.homework === student.id)
                                    ?
                                    <div className="student_file">
                                        <a href={`${studentupload.find(item => item.homework === student.id).file}`}>
                                            <div className="lesson-lokat_file">
                                                <div className="lesson-name">
                                                    {((studentupload.find(item => item.homework === student.id).file))}
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    :
                                    <div className="student_file">
                                        <a href='#'>
                                            <div className="lesson-lokat_file">
                                                <div className="lesson-name">

                                                </div>
                                            </div>
                                        </a>
                                    </div>
                            }


                            {
                                studentupload.find(item => item.homework === student.id)
                                    ? <div onClick={() => {
                                        toggle4(student.id, studentupload.find(item => item.homework === student.id).id);

                                    }} className="dowloand_file">
                                        <img src={process.env.PUBLIC_URL + '/imga/edit.png'}/>
                                    </div> :
                                    <div onClick={() => {
                                        toggle3(student.id);

                                    }} className="dowloand_file">
                                        <img src={process.env.PUBLIC_URL + '/images/file.png'}/>
                                    </div>
                            }

                        </div>

                    ))
                }


            </div>
            <Modal isOpen={modal3}
                   toggle={toggle3}
            >
                <ModalBody>


                    <div className="file-upload">
                        <input type="file" onChange={(event) => {
                            setFileData(event.target.files[0])
                        }}/>

                    </div>


                    <div className='d-flex justify-content-between mt-2'>
                        <button type='reset' onClick={toggle3} className='btn btn-danger'>Chiqish</button>
                        <button onClick={() => {
                            uploadFile();
                            toggle3()
                        }} className='btn btn-success'>Saqlash
                        </button>
                    </div>

                </ModalBody>
            </Modal>
            <Modal isOpen={modal4}
                   toggle={toggle4}
            >
                <ModalBody>


                    <div className="file-upload">
                        <input type="file" onChange={(event) => {
                            setFileData1(event.target.files[0])
                        }}/>
                    </div>


                    <div className='d-flex justify-content-between mt-2'>
                        <button type='reset' onClick={toggle4} className='btn btn-danger'>Chiqish</button>
                        <button onClick={() => {
                            uploadFile1();
                            toggle4()
                        }} className='btn btn-success'>Saqlash
                        </button>
                    </div>

                </ModalBody>
            </Modal>
        </div>
    );
}

export default TabSec4;