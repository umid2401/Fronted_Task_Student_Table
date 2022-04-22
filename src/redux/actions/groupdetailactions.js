import {GROUP_ID, VIDEO_ID} from "./actionType";


export const groupId=(value)=>(dispatch)=>{
    dispatch(
        {
            type:GROUP_ID,
            payload:value
        }
    )
}


export const videoId=(value)=>(dispatch)=>{
    dispatch(
        {
            type:VIDEO_ID,
            payload:value
        }
    )
}
export const fileToggle=(value)=>(dispatch)=>{
    dispatch(
        {
            type:VIDEO_ID,
            payload:value
        }
    )
}