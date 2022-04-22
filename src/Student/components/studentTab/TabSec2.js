import React, {useEffect, useState} from 'react';
import '../../../style/studentsec.scss'
import {InboxOutlined} from "@ant-design/icons";
import {message, Upload} from "antd";
import axios from "axios";
import {URL} from '../../../tools/const_url'
import {useSelector} from "react-redux";
function TabSec2(props) {

    const { Dragger } = Upload;



    const [file,setFile]=useState([])
    let lesson_id=useSelector(state => state.video_id.video_id_lesson)

    useEffect(()=>{
        axios.get(URL+`/api/lessons/?cat=${lesson_id}`)
            .then((res)=>{
                setFile(res.data)
            })
    },[lesson_id])
    return (
        <div>
            <div className="tab-item_2">
                {
                    file.map((item,index)=>(
                        <a href={`${URL}${item.resource_file}`}  >
                            <div className="lesson">
                                {/*<div className="lesson-check">*/}
                                {/*    <input type="checkbox"/>*/}
                                {/*</div>*/}
                                <div className="lesson-logo">
                                    <img src={process.env.PUBLIC_URL + '/images/ss.jpg'}/>
                                </div>
                                <div className="lesson-name">
                                    <div className="name-item-1">
                                        {item.resource_file}
                                    </div>
                                    <div className="name-item-2">
                                        4.0 MG | 20.06.2019
                                    </div>
                                </div>


                            </div>
                        </a>
                    ))
                }

            </div>
        </div>
    );
}

export default TabSec2;