import {listNoteReducer} from "./listNoteReducer";
import {combineReducers} from "redux";

export const reducer = combineReducers({
    listNote: listNoteReducer,
});