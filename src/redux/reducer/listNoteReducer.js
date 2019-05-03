import {defaultState} from "../store/store";
import {data} from "../../App";

export const listNoteReducer = (state = defaultState, action) => {
    if (action.type === 'updateListNoteFromServer' || action.type === 'sort') {
        return {
            listNote: action.newData,
        };
    }
    if (action.type === 'search') {
        if (action.searchValue === '') {
            return {
                listNote: data,
            };
        } else {
            return {
                listNote: state.listNote.filter((eachData) => {
                    if (eachData.data.note.includes(action.searchValue)) {
                        return eachData;
                    }
                })
            };
        }
    }
    return state;
};