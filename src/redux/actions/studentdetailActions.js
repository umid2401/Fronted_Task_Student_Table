import {STUDENT_ID} from "./actionType";

export const studentId=(value)=>(dispatch)=>{
    dispatch(
        {
            type:STUDENT_ID,
            payload:value
        }
    )
}