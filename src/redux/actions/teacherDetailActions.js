import {GROUP_ID, S_GROUP_ID, TEACHER_GROUP_ID} from "./actionType";

export const teacherGroupId =(value)=> dispatch => {
    dispatch(
        {
            type:TEACHER_GROUP_ID,
            payload:value,
        }
    )
}

export const studentGroupId =(value)=> dispatch => {
    dispatch(
        {
            type:S_GROUP_ID,
            payload:value,
        }
    )
}