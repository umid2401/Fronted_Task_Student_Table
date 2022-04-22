import {S_GROUP_ID, TEACHER_GROUP_ID} from "../actions/actionType";

const initialState = {
    group_id:null,
    teacher_id:7,
    student_id_lesson:null
}

export default function (state=initialState, action){
    switch (action.type){
        case TEACHER_GROUP_ID:
            return {
                ...state,
                group_id: action.payload
            }

        case S_GROUP_ID:
            return {
                ...state,
                student_id_lesson: action.payload
            }
        default: return state
    }
}