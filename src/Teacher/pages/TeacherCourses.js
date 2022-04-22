import React from 'react';
import StudentLayOut from "../../Student/LayOut/StudentLayOut";
import TeacherSider from "../LayOut/TeacherSider";
import TeacherSection from "../comp/TeacherSection";

function TeacherCourses(props) {
    return (
        <div>
            <StudentLayOut sider={<TeacherSider />}>
                <TeacherSection/>
            </StudentLayOut>
        </div>
    );
}

export default TeacherCourses;