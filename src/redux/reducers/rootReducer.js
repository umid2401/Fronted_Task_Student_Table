import {combineReducers} from "redux";
import GroupReducer from "./GroupReducer";
import TeacherReducer from "./TeacherReducer";
import Video_student_Lessons_Reducer from "./Video_student_Lessons_Reducer";
import StudentReducer from "./StudentReducer";


export const rootReducer = combineReducers(
    {
        groupDetail: GroupReducer,
        teacherDetail: TeacherReducer,
        studentDetail:StudentReducer,
        video_id:Video_student_Lessons_Reducer,
    }
)