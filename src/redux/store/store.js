import {createStore} from "redux";
import {reducer} from "../reducer/reducer";
import {listNoteReducer} from "../reducer/listNoteReducer";


export const defaultState = {
    listNote: [],
};


export const store = createStore(listNoteReducer);