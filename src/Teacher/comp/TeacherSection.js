import React, {useEffect, useRef, useState} from 'react';
import {
    Button,
    Form, Input,
    Upload,
    Select,

} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import '../../style/teachersection.scss'
import '../../style/courses.scss'
import axios from "axios";
import {URL} from "../../tools/const_url";
import {useSelector} from "react-redux";
import {Modal, ModalBody} from "reactstrap";
import {Option} from "antd/es/mentions";
import {toast} from "react-toastify";
import {useForm} from "antd/es/form/Form";
import {log10} from "chart.js/helpers";

function TeacherSection(props) {

    const group_id = useSelector(state => state.teacherDetail.group_id)
    const teacher_id = useSelector(state => state.teacherDetail.teacher_id)
    const [addLessonForm] = Form.useForm()
    // -------------- States ------------------
    const [group, setGroup] = useState({})
    const [lessons, setLessons] = useState([])
    const [lesson, setLesson] = useState([])
    const [lessonModal, setLessonModal] = useState(false)
    const [resourseModal, setResourseModal] = useState(false)
    const [resourseModalEdit, setResourseModalEdit] = useState(false)
    const [homeWorkModal, sethomeWorkModal] = useState(false)
    const [studentGroup, setStudentGroup] = useState([])
    const [students, setStudents] = useState([])
    const [homeWorks, setHomeWorks] = useState([])
    const [homeWork, setHomeWork] = useState([])
    const [homeWorkFiles, setHomeWorkFiles] = useState([])
    const [teacherUploadFiles, setTeacherUploadFiles] = useState([])
    const [teacherUploadFile_id, setTeacherUploadFile_id] = useState(null)

    const [changedStudentMarks, setChangedStudentMarks] = useState([])
    const [markChanged, setMarkChanged] = useState(false)
    //------------- For select -------------------
    const [antdHomeWorkSelect, setAntdHomeWorkSelect] = useState([])
    const [antdLessonSelect, setAntdLessonSelect] = useState([])

    //files state
    const [photo, setPhoto] = useState()
    const [video, setvideo] = useState()
    const [resourse, setResourse] = useState()
    const [homeworkFile, sethomeworkFile] = useState()
    //end files state

    // -------------End States ----------------

    useEffect(() => {
        axios.get(URL + `/api/student-group/?group=${group_id}`).then(resp => {
            setStudents(resp.data)
        })
        axios.get(URL + `/api/groups/${group_id}/`).then(resp => {
            setGroup(resp.data)
        })
        axios.get(URL + `/api/lessons/?group_id=${group_id}`).then(resp => {
            setLessons(resp.data)
        })
        setAntdLessonSelect('')
        setAntdHomeWorkSelect('')
        setHomeWorkFiles([])
        setLesson(0)
    }, [group_id])

    // ------------- Get homeWork -------------------
    useEffect(() => {
        if (lesson > 0) {
            axios.get(URL + `/api/homework/?lesson=${lesson}`).then(resp => {
                setHomeWorks(resp.data)
            })
            axios.get(URL + `/api/teacher-upload-files/?teacher=${teacher_id}&lesson=${lesson}`).then(resp=>{
                if (resp.data.length > 0){
                    setTeacherUploadFiles(resp.data)
                }
                else
                    setTeacherUploadFiles(0)
            })
        }
        else {
            setHomeWorks([])
        }
        setHomeWork(0)
    }, [lesson])

    //--------------- Get HomeWorkFiles ------------------- (student upload files)
    useEffect(() => {
        if (homeWork > 0) {
            axios.get(URL + `/api/student-upload/?homework=${homeWork}`).then(resp => {
                setHomeWorkFiles(resp.data)
            })
        } else {
            setHomeWorkFiles([])
        }
    }, [homeWork])


    // --------------Functions---------------

    // -------------------- Add Lesson ----------------------
    const onFinish = (values) => {
        const uploadData = new FormData()
        uploadData.append('group', group_id)
        uploadData.append('name', values.name)
            axios.post(URL + '/api/lessons/', uploadData)
            .then((res) => {
                toast.success("Yangi Lesson yaratildi !!!!")
                axios.get(URL + `/api/homework/?lesson=${lesson}`).then(resp=>{
                    setHomeWorks(resp.data)
                })
                axios.get(URL + `/api/lessons/?group_id=${group_id}`).then(resp=>{
                    setLessons(resp.data)
                })
                }
            )
            .catch(error => {
                if (error.response) {
                    if (error.response.data.error === 'group') {
                        toast.error('Guruxni tanlang !!!')
                    }
                } else
                    toast.error('Server bilan muammo yoki ma\'lumotlarni qaytadan kiriting !!!')
            })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // ------------------------Add homework -----------------------
    const onFinishHomeWork = (values) => {
        const uploadData = new FormData()
        uploadData.append('work_file', homeworkFile)
        uploadData.append('teacher', teacher_id)
        uploadData.append('lesson', lesson)
        uploadData.append('title', values.title)
        axios.post(URL + '/api/homework/', uploadData)
            .then((res) => {
                    toast.success("Yangi HomeWork yaratildi !!!!")
                    sethomeworkFile()
                    axios.get(URL + `/api/homework/?lesson=${lesson}`).then(resp=>{
                        setHomeWorks(resp.data)
                    })
                    toggleHomework()
                }
            )
            .catch(error => {
                console.log(error.response)
                if (error.response){
                    if(error.response.data.error === 'file'){
                        toast.error('Fileni belgilang !!!')
                    }
                } else
                    toast.error('Server bilan muammo yoki ma\'lumotlarni qaytadan kiriting !!!')
                sethomeworkFile()
            })
    };

    const onFinishFailedHomeWork = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // -------------------------- Add Teacher Upload Files ------------------------------

    const onFinishTeacherUploadFiles = (values) => {
        const uploadData = new FormData()
        uploadData.append('image', photo)
        uploadData.append('video', video)
        uploadData.append('resource', resourse)
        uploadData.append('teacher', teacher_id)
        uploadData.append('lesson', lesson)
        axios.post(URL + '/api/teacher-upload-files/', uploadData)
            .then((res) => {
                    toast.success("Resourses added !!!!")
                    setPhoto()
                    setvideo()
                    setResourse()
                    axios.get(URL + `/api/teacher-upload-files/?teacher=${teacher_id}&lesson=${lesson}`).then(resp=>{
                        if (resp.data.length > 0){
                            setTeacherUploadFiles(resp.data)
                        }
                        else
                            setTeacherUploadFiles(0)
                    })
                    toggleResourse()
                }
            )
            .catch(error => {
                setPhoto()
                setvideo()
                setResourse()
                console.log(error)
                toast.error("Serverda xatolik yoki qaytadan urinib ko'ring")
            })
    };
    const EditTeacherUploadFiles = (values) => {
        const uploadData = new FormData()
        if (photo){
            uploadData.append('image', photo)
        }
        if (video){
            uploadData.append('video', video)
        }
        if(resourse){
            uploadData.append('resource', resourse)
        }
        uploadData.append('teacher', teacher_id)
        uploadData.append('lesson', lesson)
        axios.patch(URL + `/api/teacher-upload-files/${teacherUploadFile_id}/`, uploadData)
            .then((res) => {
                    toast.success("Resourses edited !!!!")
                    setPhoto()
                    setvideo()
                    setResourse()
                    axios.get(URL + `/api/teacher-upload-files/?teacher=${teacher_id}&lesson=${lesson}`).then(resp=>{
                        if (resp.data.length > 0){
                            setTeacherUploadFiles(resp.data)
                        }
                        else
                            setTeacherUploadFiles(0)
                    })
                    toggleResourseEdit()
                }
            )
            .catch(error => {
                setPhoto()
                setvideo()
                setResourse()
                console.log(error)
            })
    };
    const onFinishFailedTeacherUploadFiles = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // -------------------------- End Teacher Upload Files finish ------------------------------
    const toggleLesson = () =>{
        setLessonModal(!lessonModal)
    }
    const toggleResourse = () =>{
        setResourseModal(!resourseModal)
    }
    const toggleResourseEdit = () =>{
        setResourseModalEdit(!resourseModalEdit)
    }
    const toggleHomework = () =>{
        sethomeWorkModal(!homeWorkModal)
    }
    const lessonSelect = (value) => {
        setLesson(value)
        let antdlesson = lessons.find(item => item.id === value)
        setAntdLessonSelect(antdlesson.name)
        setAntdHomeWorkSelect('')
    }
    const getStudentHomeworks = (value) => {
        setHomeWork(value)
        let homew = homeWorks.find(item => item.id === value)
        setAntdHomeWorkSelect(homew.title)
    }

    //-------------------- Mark on changed ---------------------
    const changedMarks = (e, student_id) => {
        let student_upload = homeWorkFiles.find(item => item.student === student_id)
        console.log(e.currentTarget.value, student_id)

        let obj = {
            'id': student_upload.id,
            'mark': e.currentTarget.value
        }
        let student_mark = changedStudentMarks.find(item => item.id === student_upload.id)
        if (!student_mark) {
            changedStudentMarks.push(obj)
        } else if (student_mark) {
            let index = changedStudentMarks.indexOf(student_mark)
            changedStudentMarks[index].mark = e.currentTarget.value
        }
        console.log(changedStudentMarks)
    }

    const marksSave = () => {
        changedStudentMarks.map(item => {
            const uploadData = new FormData()
            uploadData.append('mark', item.mark)
            axios.patch(URL + `/api/student-upload/${item.id}/`, uploadData)
                .then(resp => {
                    setMarkChanged(true)
                    toast.success("Baholar muvafaqiyatli ozgartrildi")
                    console.log(resp)
                })
                .catch(error => {
                    setMarkChanged(false)
                    console.log(error)
                })
        })
        if (markChanged) {
            axios.get(URL + `/api/student-upload/?homework=${homeWork}`).then(resp => {
                setHomeWorkFiles(resp.data)
            })

        }
    }
    return (
        <div>
            <div className="teacher_page">
                <div className="row">
                    <div className="row">
                        <div className="col-md-10 col-lg-10 col-12 col-sm-12">
                            <h5>Lessonni tanlang</h5>
                            <Form
                                form={addLessonForm}
                                labelCol={{span: 4}}
                                wrapperCol={{span: 14}}
                                layout="horizontal"
                                className='form-control'
                            >
                                <Select value={antdLessonSelect} className='form-control'
                                        onChange={(e) => lessonSelect(e)}>
                                    {lessons.map((lesson, index) => {
                                        return <Select.Option key={index}
                                                              value={lesson.id}>{lesson.name}</Select.Option>
                                    })}
                                </Select>
                            </Form>
                        </div>
                        <div className="col-md-2 col-lg-2 col-6 col-sm-6 d-flex align-items-end">
                            <button
                                className={(group_id) ? 'btn btn-success text-center text-white btn-block' : 'btn btn-success text-center text-white btn-block disabled'}
                                onClick={toggleLesson}> Add Lesson +
                            </button>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-10 col-lg-10 col-12 col-sm-12">
                            <h5 className='mt-2'>Homeworkni tanlang</h5>
                            <Select value={antdHomeWorkSelect} allowClear={true} className='form-control'
                                    onChange={e => {
                                        getStudentHomeworks(e);
                                    }}>
                                {homeWorks.map((homework, index) => {
                                    return <Select.Option key={index}
                                                          value={homework.id}>{homework.title}</Select.Option>
                                })}
                            </Select>
                        </div>
                        <div className="col-md-2 col-lg-2 col-6 col-sm-6 d-flex align-items-end">
                            <button
                                className={(lesson > 0) ? 'btn btn-success text-center text-white btn-block' : 'btn btn-success text-center text-white btn-block disabled'}
                                onClick={toggleHomework}>Add Homework
                            </button>
                        </div>
                    </div>

                    <div className="col-md-12 col-lg-12 col-sm-12 col-12 mt-2">

                        <div className="tab-sec-body">
                            <div className="sec-header">
                                <div className="item-check_1">
                                    <img src="/imga/ttt.png" alt=""/>
                                </div>
                                <div className="item-he-header">
                                    Ism Familyasi
                                </div>
                                <div className="item-he-D_1" style={{flex: "1"}}>
                                    Yuklagan vazifasi
                                </div>
                                <div className="item-he-D_1">
                                    Bahosi
                                </div>
                                <div className="item-he-D_1">
                                    Umumiy bahosi
                                </div>
                                <div className="item-he-D_1">
                                    Tuzatma
                                </div>
                            </div>
                            {students.map(student => {
                                return (
                                    <div className="sec-header">
                                        <div className="item-check_1">
                                            <img src="/imga/ttt.png" alt=""/>
                                        </div>
                                        <div className="item-he-header">
                                            {student.name}
                                        </div>
                                        <div className="item-he-D_1" style={{flex: '1'}}>
                                            {
                                                homeWorkFiles.find(item => item.student === student.id)
                                                    ?
                                                    <a href={homeWorkFiles.find(item => item.student === student.id).file}>Vazifani
                                                        ochish</a>
                                                    : ''
                                            }
                                        </div>
                                        <div className="item-he-D_1">
                                            {
                                                homeWorkFiles.find(item => item.student === student.id)
                                                    ?
                                                    <input className="form-control"
                                                           onChange={(e) => changedMarks(e, student.id)}
                                                           defaultValue={homeWorkFiles.find(item => item.student === student.id) ? homeWorkFiles.find(item => item.student === student.id).mark : ''}/>
                                                    : ''
                                            }

                                        </div>
                                        <div className="item-he-D_1">

                                        </div>
                                        <div className="item-he-D_1">
                                            <div className="button-edit">
                                                Tahrirlash
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}


                        </div>
                    </div>
                    <div className="col-md-10 col-lg-10 col-sm-6 col-6"></div>
                    <div className="col-md-2 col-lg-2 col-6 col-sm-6 mt-3">
                        <div className="button-save" onClick={() => marksSave()}>
                            Saqlash
                        </div>
                    </div>
                </div>
               {
                   (lesson )?
                       (teacherUploadFiles)?
                           teacherUploadFiles.map(item=>{
                               return (
                                   <div className="row mt-3" style={{maxHeight:'300px'}}>
                                       <div className="col-md-12"><h4 className='text-center'>Lesson resourses</h4></div>
                                       <div className="col-md-6">
                                           <div>
                                               <h5>Video</h5>
                                               <video controls style={{width:'100%', height:'200px'}}>
                                                   <source src={`${item.video}`}/>
                                               </video>
                                           </div>
                                       </div>
                                       <div className="col-md-2 text-center">
                                           <h5>Resourse</h5>
                                           <a href={`${item.resource}`}>Fileni yuklash</a>
                                       </div>
                                       <div className="col-md-2 text-center">
                                           <h5>Rasm</h5>
                                           <div>
                                               <img style={{width:'100%'}} src={`${item.image}`} alt=""/>
                                           </div>
                                       </div>
                                       <div className="col-md-2">
                                           <button type='button' className='btn btn-warning' onClick={()=>{toggleResourseEdit(); setTeacherUploadFile_id(item.id)}}>Edit resourse</button>
                                       </div>
                                   </div>
                               )
                           })
                           : (teacherUploadFiles === 0)?
                               <div className='row text-center mt-3'>
                                   <div className="col-md-10">
                                       <h5>Bu lessonda resourselar yo'q</h5>
                                   </div>
                                   <div className="col-md-2">
                                       <button type='button' onClick={toggleResourse} className='btn btn-primary'>Add resourse</button>
                                   </div>
                               </div>
                               :''
                       : ''
               }
               <div className="upload_file_student">
                   <div className="file-title">
                       Yuklangan vazifalar
                   </div>
                   <div className="row">
                       <div className="col-md-10 col-lg-10 col-12 col-sm-12">
                           <Form
                               labelCol={{ span: 4 }}
                               wrapperCol={{ span: 14 }}
                               layout="horizontal"
                               className='form-control'
                           >
                               <Select    className='form-control' >
                                   <Select.Option value="demo">Lesson</Select.Option>
                                   <Select.Option value="demo">Lesson</Select.Option>
                                   <Select.Option value="demo">Lesson</Select.Option>
                                   <Select.Option value="demo">Lesson</Select.Option>
                                   <Select.Option value="demo">Lesson</Select.Option>
                                   <Select.Option value="demo">Lesson</Select.Option>
                                   <Select.Option value="demo">Lesson</Select.Option>
                               </Select>
                           </Form>
                       </div>
                   </div>
                   <div className="student_file">
                       <div className="student-sec">
                           <div className="student_name">
                               Sherzod Otaqulov
                           </div>
                           <div className="lesson-lokat">
                               <div className="lesson-logo">
                                   <img src="/crm_front_end/images/download.png"/>
                               </div>
                               <div className="lesson-name">
                                   <div className="name-item-1">
                                       Birinchi bo’lim bo’yicha umumiy vazifalar.txt
                                   </div>
                                   <div className="name-item-2">
                                       4.0 MG | 20.06.2019
                                   </div>
                               </div>
                           </div>
                       </div>
                       <div className="student-sec">
                           <div className="student_name">
                               Sherzod Otaqulov
                           </div>
                           <div className="lesson-lokat">
                               <div className="lesson-logo">
                                   <img src="/crm_front_end/images/download.png"/>
                               </div>
                               <div className="lesson-name">
                                   <div className="name-item-1">
                                       Birinchi bo’lim bo’yicha umumiy vazifalar.txt
                                   </div>
                                   <div className="name-item-2">
                                       4.0 MG | 20.06.2019
                                   </div>
                               </div>
                           </div>
                       </div>


                    </div>
                </div>
                <div className="video-upload_file">
                    <div className="file-title">
                        Men yuklagan video darslilar
                    </div>
                    <div className="row mt-2">
                        <div className="col-md-3 col-lg-3 col-6 col-sm-6">
                            <div className="card-video">
                                <div className="video_header">

                                </div>
                                <div className="video_title">
                                    Python asoslari
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-lg-3 col-6 col-sm-6">
                            <div className="card-video">
                                <div className="video_header">

                                </div>
                                <div className="video_title">
                                    Python asoslari
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-lg-3 col-6 col-sm-6">
                            <div className="card-video">
                                <div className="video_header">

                                </div>
                                <div className="video_title">
                                    Python asoslari
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-lg-3 col-6 col-sm-6">
                            <div className="card-video">
                                <div className="video_header">

                                </div>
                                <div className="video_title">
                                    Python asoslari
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-lg-3 col-6 col-sm-6">
                            <div className="card-video">
                                <div className="video_header">

                                </div>
                                <div className="video_title">
                                    Python asoslari
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="file_save">
                    <div className="file-title">
                        Men yuklagan vazifalar
                    </div>

                    <div className="student-sec_save">
                        <div className="lesson_name">
                            Sherzod Otaqulov
                        </div>
                        <div className="lesson-lokat_save">
                            <div className="lesson-logo">
                                <img src="/crm_front_end/images/download.png"/>
                            </div>
                            <div className="lesson-name">
                                <div className="name-item-1">
                                    Birinchi bo’lim bo’yicha umumiy vazifalar.txt
                                </div>
                                <div className="name-item-2">
                                    4.0 MG | 20.06.2019
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="student-sec_save">
                        <div className="lesson_name">
                            Sherzod Otaqulov
                        </div>
                        <div className="lesson-lokat_save">
                            <div className="lesson-logo">
                                <img src="/crm_front_end/images/download.png"/>
                            </div>
                            <div className="lesson-name">
                                <div className="name-item-1">
                                    Birinchi bo’lim bo’yicha umumiy vazifalar.txt
                                </div>
                                <div className="name-item-2">
                                    4.0 MG | 20.06.2019
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="student-sec_save">
                        <div className="lesson_name">
                            3-dars Django haqida tushuncha
                        </div>
                        <div className="lesson-lokat_save">
                            <div className="lesson-logo">
                                <img src="/crm_front_end/images/download.png"/>
                            </div>
                            <div className="lesson-name">
                                <div className="name-item-1">
                                    Birinchi bo’lim bo’yicha umumiy vazifalar.txt
                                </div>
                                <div className="name-item-2">
                                    4.0 MG | 20.06.2019
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Modal isOpen={lessonModal}
                   toggle={toggleLesson}
                   centered={true}
            >
                <ModalBody>
                    <div className="card">
                        <div className="card-header text-white text-center bg-dark">
                            Add Lesson
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
                                    label="Lesson name"
                                    name="name"
                                    rules={[{required: true, message: 'Iltimos First  Nameni kiriting !!!'}]}
                                >
                                    <Input/>
                                </Form.Item>

                                <div className='d-flex justify-content-around'>
                                    <Button type="primary" htmlType="submit" onClick={toggleLesson}>
                                        Saqlash
                                    </Button>

                                    <Button type="danger" onClick={toggleLesson}>
                                        Chiqish
                                    </Button>
                                </div>


                            </Form>
                        </div>

                    </div>
                </ModalBody>
            </Modal>
            <Modal isOpen={resourseModal}
                   toggle={toggleResourse}
                   centered={true}
            >
                <ModalBody>
                    <div className="card">
                        <div className="card-header text-white text-center bg-dark">
                            Add Resourse for Lesson
                        </div>
                        <div className="card-body">
                            <Form
                                name="basic"
                                labelCol={{span: 8}}
                                wrapperCol={{span: 16}}
                                initialValues={{remember: true}}
                                onFinish={onFinishTeacherUploadFiles}
                                onFinishFailed={onFinishFailedTeacherUploadFiles}
                                autoComplete="off"
                            >
                                <Form.Item
                                    label="Video file"
                                    valuePropName="fileList"
                                    extra=".mp4"
                                >
                                    <input type='file' onChange={e => setvideo(e.target.files[0])}/>
                                </Form.Item>
                                <Form.Item
                                    label="Photo for video header"
                                    valuePropName="fileList"
                                    extra=".png .jpg"
                                >
                                    <input type='file' onChange={e => setPhoto(e.target.files[0])}/>
                                </Form.Item>
                                <Form.Item
                                    label="File or resourse"
                                    valuePropName="fileList"
                                    extra=".zip .rar "
                                >
                                    <input type='file' onChange={e => setResourse(e.target.files[0])}/>
                                </Form.Item>

                                <div className='d-flex justify-content-around'>
                                    <Button type="primary" htmlType="submit">
                                        Saqlash
                                    </Button>

                                    <Button type="danger" onClick={toggleResourse}>
                                        Chiqish
                                    </Button>
                                </div>


                            </Form>
                        </div>

                    </div>
                </ModalBody>
            </Modal>
            <Modal isOpen={resourseModalEdit}
                   toggle={toggleResourseEdit}
                   centered={true}
            >
                <ModalBody>
                    <div className="card">
                        <div className="card-header text-white text-center bg-dark">
                            Edit Resourse
                        </div>
                        <div className="card-body">
                            <Form
                                name="basic"
                                labelCol={{span: 8}}
                                wrapperCol={{span: 16}}
                                initialValues={{remember: true}}
                                onFinish={EditTeacherUploadFiles}
                                onFinishFailed={onFinishFailedTeacherUploadFiles}
                                autoComplete="off"
                            >
                                <Form.Item
                                    label="Video file"
                                    valuePropName="fileList"
                                    extra=".mp4"
                                >
                                    <input type='file' onChange={e=>setvideo(e.target.files[0])}/>
                                </Form.Item>
                                <Form.Item
                                    label="Photo for video header"
                                    valuePropName="fileList"
                                    extra=".png .jpg"
                                >
                                    <input type='file' onChange={e=>setPhoto(e.target.files[0])}/>
                                </Form.Item>
                                <Form.Item
                                    label="File or resourse"
                                    valuePropName="fileList"
                                    extra=".zip .rar "
                                >
                                    <input type='file' onChange={e=>setResourse(e.target.files[0])}/>
                                </Form.Item>

                                <div className='d-flex justify-content-around'>
                                    <Button type="primary" htmlType="submit">
                                        Saqlash
                                    </Button>

                                    <Button type="danger" onClick={toggleResourseEdit}>
                                        Chiqish
                                    </Button>
                                </div>
                            </Form>
                        </div>

                    </div>
                </ModalBody>
            </Modal>
            <Modal isOpen={homeWorkModal}
                   toggle={toggleHomework}
                   centered={true}
            >
                <ModalBody>
                    <div className="card">
                        <div className="card-header text-white text-center bg-dark">
                            Add HomeWork
                        </div>
                        <div className="card-body">
                            <Form
                                name="basic2"
                                labelCol={{span: 8}}
                                wrapperCol={{span: 16}}
                                initialValues={{remember: true}}
                                onFinish={onFinishHomeWork}
                                onFinishFailed={onFinishFailedHomeWork}
                                autoComplete="off"
                            >
                                <Form.Item
                                    label="Homework name"
                                    name="title"
                                    rules={[{required: true, message: 'Homework nomini kiriting!!!'}]}
                                >
                                    <Input/>
                                </Form.Item>

                                <Form.Item
                                    label="File or resourse"
                                    valuePropName="fileList"
                                    extra=".zip .rar "
                                >
                                    <input type='file' onChange={e => sethomeworkFile(e.target.files[0])}/>
                                </Form.Item>

                                <div className='d-flex justify-content-around'>
                                    <Button type="primary" htmlType="submit">
                                        Saqlash
                                    </Button>

                                    <Button type="danger" onClick={toggleHomework}>
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

export default TeacherSection;