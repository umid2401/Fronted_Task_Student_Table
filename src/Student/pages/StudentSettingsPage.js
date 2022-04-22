import React from 'react';
import StudentLayOut from "../LayOut/StudentLayOut";
import StudentSettings from "../components/StudentSettings";
import {URL} from "../../tools/const_url";
import StudentSecComponent from "../components/StudentSecComponent";
import StudentLessonSider from "../LayOut/StudentLessonSider";
import StudentSettingsLayout from "../LayOut/StudentSettingsLayout";

function StudentSettingsPage(props) {
    return (
        <div>
            <StudentLayOut  sider={<StudentSettingsLayout/>}>
                <div className="student-lesson">
                    <StudentSettings/>
                </div>
            </StudentLayOut>
        </div>
    );
}

export default StudentSettingsPage;