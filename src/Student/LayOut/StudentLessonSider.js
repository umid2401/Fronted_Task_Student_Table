import React, {useEffect, useState} from 'react';
import '../../style/sider.scss'
import {BiTimeFive} from 'react-icons/bi'
import axios from "axios";
import {URL} from "../../tools/const_url";
import {useDispatch,useSelector} from "react-redux";
import {videoId} from "../../redux/actions/groupdetailactions";
import {Card, CardBody, Collapse} from "reactstrap";
import {AiOutlineDown,AiOutlineUp} from "react-icons/ai";
import {RiDashboardFill, RiTableLine, RiGroupFill,RiSettings4Line} from "react-icons/ri";
import {SiSvg} from "react-icons/si";
import {studentGroupId, teacherGroupId} from "../../redux/actions/teacherDetailActions";
import {Link} from 'react-router-dom'
function StudentLessonSider(props) {
    const toggle = (event)=>{
        setCollapse(!collapse)
        if(!collapse)
            event.currentTarget.parentNode.classList.add('activee')
        else event.currentTarget.parentNode.classList.remove('activee')
    }
    const [lesson,setLesson]=useState([])
    const [studentGroups,setStudentGroups]=useState([])
    let lesson_group_id=useSelector(state => state.teacherDetail.student_id_lesson)
    let student_id=useSelector(state => state.studentDetail.student_id)
    useEffect(()=>{
        axios.get(URL+`/api/students/?student=${student_id}`)
            .then((res)=>{
                setStudentGroups(res.data[0].group_names)
            })
    },[])
    useEffect(()=>{
        console.log(lesson_group_id)
        axios.get(URL+`/api/lessons/?group=${lesson_group_id}`)
            .then((res)=>{
                setLesson(res.data)

            })
    },[lesson_group_id])
    const dispatch=useDispatch()
    const [collapse, setCollapse] = useState(false)
    function FuncId(id) {
        dispatch(videoId(id))
    }



    const getGroupIdStudent = (e,name) =>{

        let group_buttons = document.querySelectorAll('.collapse-button')
        for (let i=0; i<group_buttons.length; i++){
            group_buttons[i].classList.remove('active_collapse_button')
        }
        axios.get(URL + `/api/groups/?name=${name}`).then(resp=>{
            dispatch(studentGroupId(resp.data.group_id))

        })

    }

console.log(studentGroups)

    return (
            <div className="sider-for-lesson">
                <div className="sider">
                    <div className="sider__menu" >
                        <div className="sider__menu__item" onClick={(event)=>toggle(event)}>
                            <RiGroupFill />
                            <h3>Mening Kurslarim {collapse ? <AiOutlineUp/>:<AiOutlineDown/>}</h3>
                        </div>
                        <Collapse isOpen={collapse}>
                            <Card>
                                <CardBody>
                                    {studentGroups.map((name, index)=>{
                                        return <a onClick={(e)=>getGroupIdStudent(e,name)} key={index} className='collapse-button'>{name}</a>
                                    })}
                                </CardBody>
                            </Card>
                        </Collapse>
                    </div>
                </div>
                <div className="sider">
                    <Link to='/student-settings'>
                        <div className="sider__menu" >
                            <div className="sider__menu__item d-flex align-content-center" onClick={(event)=>toggle(event)}>
                                <RiSettings4Line style={{fontSize:'23'}} />
                                <h3>Sozlamalar</h3>
                            </div>
                        </div>
                    </Link>

                </div>
                <div className="sider-lessons">
                    <h3 className="course_title">
                        Python dasturlash asoslari
                    </h3>
                    {
                        lesson.map((item,index)=>(
                            <div className="lesson-item" onClick={()=>FuncId(item.id)}>

                                <div className="video-img">


                                        <img src={process.env.PUBLIC_URL + '/course.jpg'} alt=""/>

                                </div>
                                <div className="lesson-title">
                                    <h4>
                                        {index+1}.dars {item.name}
                                    </h4>

                                    <div className="d-flex align-items-start" style={{color:'#2E2E2E'}}>
                                        <BiTimeFive />
                                        <p>
                                            01:07:15
                                        </p>
                                    </div>
                                </div>

                            </div>
                        ))
                    }


                </div>
            </div>
    );
}

export default StudentLessonSider;