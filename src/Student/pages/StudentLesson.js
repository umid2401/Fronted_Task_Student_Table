import React, {useEffect, useState} from 'react';
import StudentLayOut from "../LayOut/StudentLayOut";
import '../../style/student/student_lesson.scss'
import VideoPlayerr from "../components/VideoPlayerr";
import {GrPrevious, GrNext} from "react-icons/gr";
import StudentLessonSider from "../LayOut/StudentLessonSider";
import StudentSecComponent from "../components/StudentSecComponent";
import axios from "axios";
import {URL} from '../../tools/const_url'
import {useSelector} from "react-redux";

function StudentLesson(props) {
    const [lesson, setLesson] = useState([])
    const [video, setVideo] = useState([])
    let video_Id_lesson = useSelector(state => state.video_id.video_id_lesson)

    useEffect(() => {
        axios.get(URL + `/api/lessons/?cat=${(video_Id_lesson)}`)
            .then((res) => {
                setVideo(res.data)

            })
    }, [video_Id_lesson])


    return (
        <div>

            <StudentLayOut sider={<StudentLessonSider/>}>
                <div className="student-lesson">


                    {
                        video.map((item, index) => (

                            <div>
                                <div className="video_page" key={item.id}>
                                    <video controls >
                                        <source src={`${URL}${item.video}`}/>
                                    </video>
                                </div>
                                <div className="lesson-title-div">
                                    <h3 className='lesson-title'>{item.name}</h3>
                                    {/*<div className='d-flex align-items-end'>*/}
                                    {/*    <a className="lesson-title-button" style={{marginRight: '10px'}}*/}
                                    {/*       href="#"><GrPrevious/> Oldingi dars</a>*/}
                                    {/*    <a className="lesson-title-button" href="#">Keyingi dars <GrNext/></a>*/}
                                    {/*</div>*/}
                                </div>

                                <a href='#' className='d-flex align-items-center'
                                   style={{marginTop: '12px', textDecoration: 'none'}}>
                                    {
                                        item.teacher_ImgURL
                                        ?
                                            <div className="teacher-img">
                                                <img src={`${URL}${item.teacher_ImgURL}`} alt=""/>
                                            </div>
                                            :
                                            <div className="teacher-img">
                                                            <div className="back">

                                                            </div>
                                            </div>
                                    }

                                    <h3 className="teacher-name">
                                       {item.teacher_first_name} {item.teacher_last_name}
                                    </h3>
                                </a>
                            </div>
                        ))
                    }


                    <StudentSecComponent/>
                </div>
            </StudentLayOut>
        </div>
    );
}

export default StudentLesson;