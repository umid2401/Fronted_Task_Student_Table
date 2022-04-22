import {GROUP_ID} from "../actions/actionType";

const initialState = {
    group_id:0,

}
export default function (state = initialState, action) {
    switch (action.type) {
        case GROUP_ID:
            return {
                ...state,
                group_id: action.payload
            }

    }
    return state
}