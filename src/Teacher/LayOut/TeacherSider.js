import React, {useEffect, useState} from 'react';
import {RiDashboardFill, RiTableLine, RiGroupFill} from "react-icons/ri";
import {AiOutlineDown,AiOutlineUp} from "react-icons/ai";
import '../../style/sider.scss'
import {Card, CardBody, Collapse} from "reactstrap";
import {URL} from '../../tools/const_url'
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {teacherGroupId} from "../../redux/actions/teacherDetailActions";
import {Button, Form, Input, Select} from "antd";

function TeacherSider(props) {

    const teacher_id = useSelector(state => state.teacherDetail.teacher_id)
    const group_id = useSelector(state => state.teacherDetail.group_id)

    // ----------- States -------------

    const [teacher, setTeacher] = useState([])
    const [teacherGroups, setTeacherGroups] = useState([])
    const [collapse, setCollapse] = useState(false)

    //----------- End States----------------

    useEffect(()=>{
        axios.get(URL + `/api/teacher/${teacher_id}/`).then(resp=>{
            setTeacher(resp.data)
            setTeacherGroups(resp.data.group_names)
        })
    },[])

    // ----------- Functions ----------------
    const toggle = (event)=>{
        setCollapse(!collapse)
        if(!collapse)
            event.currentTarget.parentNode.classList.add('activee')
        else event.currentTarget.parentNode.classList.remove('activee')
    }
    const dispatch = useDispatch()

    const getGroupId = (e,name) =>{
        let group_buttons = document.querySelectorAll('.collapse-button')
        for (let i=0; i<group_buttons.length; i++){
            group_buttons[i].classList.remove('active_collapse_button')
        }
        e.currentTarget.classList.add('active_collapse_button')
        axios.get(URL + `/api/groups/?name=${name}`).then(resp=>{
            dispatch(teacherGroupId(resp.data.group_id))
        })
    }
    // --------- End Functions --------------
    return (
        <div className="sider">
            <div className="sider__menu">
                <div className="sider__menu__item">
                    <RiDashboardFill />
                    <h3>Dashboard</h3>
                </div>
            </div>
            <div className="sider__menu" >
                <div className="sider__menu__item" onClick={(event)=>toggle(event)}>
                    <RiGroupFill />
                    <h3>Mening Kurslarim {collapse ? <AiOutlineUp/>:<AiOutlineDown/>}</h3>
                </div>
                <Collapse isOpen={collapse}>
                    <Card>
                        <CardBody>
                            {teacherGroups.map((name, index)=>{
                                return <a onClick={(e)=>getGroupId(e,name)} key={index} className='collapse-button'>{name}</a>
                            })}
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
            <div className="sider__menu">
                <div className="sider__menu__item">
                    <RiTableLine />
                    <h3>Dars jadvali</h3>
                </div>
            </div>
        </div>
    );
}

export default TeacherSider;