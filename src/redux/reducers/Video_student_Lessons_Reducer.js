import {VIDEO_ID} from "../actions/actionType";

const intialState={
    video_id_lesson:null,
    file_toggle:0
}
export default function (state=intialState,action) {
    switch (action.type) {
        case VIDEO_ID:
            return {
                ...state,
                video_id_lesson: action.payload
            }
    }
    return state
}