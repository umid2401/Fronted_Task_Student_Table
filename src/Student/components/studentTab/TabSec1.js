import React, {useEffect, useState, useRef} from 'react';
import '../../../style/studentsec.scss'
import axios from "axios";
import {URL} from '../../../tools/const_url'
import {useSelector} from "react-redux";
import {Form, Input} from 'antd'
import {toast} from "react-toastify";

function TabSec1(props) {
    const [comment, setComment] = useState([])
    let lesson_id = useSelector(state => state.video_id.video_id_lesson)
    useEffect(() => {
        axios.get(URL + `/api/comments/?cat=${lesson_id}`)
            .then((res) => {
                setComment(res.data)
            })
    }, [lesson_id])

    const myRef = useRef()
    const [form] = Form.useForm();
    let student_id=useSelector(state => state.studentDetail.student_id)
    const onFinish = (values) => {

        let value_comment =
            {
                ...values,
                student: student_id,
                lesson: lesson_id
            }


        axios.post(URL + '/api/comments/', value_comment)
            .then((res) => {
                axios.get(URL + `/api/comments/?cat=${lesson_id}`)
                    .then((res2) => {
                        setComment(res2.data)
                        toast.success('Izohingiz saqlab qo\'yildi !!!!')
                    })
            })
            .catch(error => {
                toast.error('Server bilan muammo !!!')
            })
        form.resetFields()
    };
    return (
        <div>

            <div className="tab-item_1">
                {
                    comment.map((item, insex) => (
                        <div className="student-item">
                            {
                                item.comment_imgURL
                                ?
                                    <div className="student-img">
                                        <img src={`${URL}${item.comment_imgURL}`}
                                             alt=""/>
                                    </div>
                                    :
                                    <div className="student-img">
                                        <div className="back-img">

                                        </div>
                                    </div>
                            }

                            <div className="student-content">
                                <div className="content-title">
                                    {item.comment_first_name} {item.comment_last_name}
                                </div>
                                <div className="content-text">
                                    {item.text}
                                </div>
                                <div className="content-message">
                                    <div className="title">
                                        Javob berish
                                    </div>
                                    <div className="time">
                                        25-03-2022
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }

                <Form
                    form={form}
                    onFinish={onFinish}
                >
                    <div className="message-send">
                        <Form.Item
                            name="text"
                            rules={[{required: true, message: 'Iltimos izoh  qoldiring !!!'}]}
                        >
                            <Input.TextArea showCount maxLength={500}/>
                        </Form.Item>

                    </div>
                    <div className="button-sec">
                        <button className="item_1" type='reset'>
                            Bekor qilish
                        </button>
                        <button className="item_2" type='submit'>
                            Jo'natish
                        </button>
                    </div>
                </Form>

            </div>
        </div>
    );
}

export default TabSec1;