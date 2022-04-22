import {S_GROUP_ID, STUDENT_ID, TEACHER_GROUP_ID} from "../actions/actionType";

const initialState = {
    student_id:51
}

export default function (state=initialState, action){
    switch (action.type){
        case STUDENT_ID:
            return {
                ...state,
                student_id: action.payload
            }


        default: return state
    }
}