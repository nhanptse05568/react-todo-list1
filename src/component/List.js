import React, {Component} from 'react';
import firebase from '../api/api';
import {connect} from "react-redux";

class List extends Component {
    database;
    notes;
    sbTask;
    sbLevel;

    constructor(props) {
        super(props);
        this.sbTask = true;
        this.sbLevel = true;
        this.database = firebase.database();
        this.notes = this.database.ref('Notes');
        this.state = {
            isEditing: false,
            editingKey: -1,
        };
    }

    pressedEditButton(key) {
        this.setState({
            isEditing: true,
            editingKey: key,
        })
    }

    pressedDeleteButton(key) {
        this.notes.child(key).remove().then(() => {
            alert('Delete successful');
        }).catch((error) => {
            alert(error.message);
        });
    }

    pressedCancelEditButton() {
        this.setState({
            isEditing: false,
            editingKey: -1,
        })
    }

    pressedSaveEditButton(key) {
        if (this.refs.txtNoteEdit.value === '') {
            alert('Note must not be empty');
        } else {
            this.notes.child(key).update({
                note: this.refs.txtNoteEdit.value,
                level: this.refs.slLevelEdit.value,
            }).then(() => {
                alert('Edit successful');
                this.setState({
                    isEditing: false,
                    editingKey: -1,
                })
            }).catch((error) => {
                alert(error.message);
            });
        }
    }

    sortByTask() {
        if (this.sbTask) {
            this.props.dispatch({
                type: 'sort',
                newData: this.props.listNote.sort((a, b) => (a.data.note > b.data.note) ? 1 : ((b.data.note > a.data.note) ? -1 : 0)),
            });
            this.sbTask = false;
        } else {
            this.props.dispatch({
                type: 'sort',
                newData: this.props.listNote.sort((b, a) => (a.data.note > b.data.note) ? 1 : ((b.data.note > a.data.note) ? -1 : 0)),
            });
            this.sbTask = true;
        }
    }

    convertLevelToInt(level) {
        switch (level) {
            case 'high': {
                return 3;
            }
            case 'medium': {
                return 2;
            }
            default: {
                return 1;
            }
        }
    }

    sortByLevel() {
        if (this.sbLevel) {
            this.props.dispatch({
                type: 'sort',
                newData: this.props.listNote.sort((a, b) => (this.convertLevelToInt(a.data.level) > this.convertLevelToInt(b.data.level)) ? 1 : ((this.convertLevelToInt(b.data.level) > this.convertLevelToInt(a.data.level)) ? -1 : 0)),
            });
            this.sbLevel = false;
        } else {
            this.props.dispatch({
                type: 'sort',
                newData: this.props.listNote.sort((b, a) => (this.convertLevelToInt(a.data.level) > this.convertLevelToInt(b.data.level)) ? 1 : ((this.convertLevelToInt(b.data.level) > this.convertLevelToInt(a.data.level)) ? -1 : 0)),
            });
            this.sbLevel = true;
        }
    }

    render() {
        return (
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <th rowSpan={2}>
                            <button className="btn btn-link" onClick={() => {
                                this.sortByTask()
                            }}>Task
                            </button>
                        </th>
                        <th rowSpan={2}>
                            <button className="btn btn-link" onClick={() => {
                                this.sortByLevel()
                            }}>Level
                            </button>
                        </th>
                        <th rowSpan={2}>
                            <button className="btn btn-link">Action</button>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.listNote.map((note, index) => {
                        if (this.state.isEditing === false || this.state.editingKey !== note.key) {
                            return (
                                <tr key={index} id={note.key}>
                                    <td>{note.data.note}</td>
                                    <td>{note.data.level}</td>
                                    <td>
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-warning" onClick={() => {
                                                this.pressedEditButton(note.key)
                                            }}>Edit
                                            </button>
                                            <button type="button" className="btn btn-danger" onClick={() => {
                                                this.pressedDeleteButton(note.key)
                                            }}>Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        } else {
                            return (
                                <tr key={index} id={note.key}>
                                    <td><input type="text" defaultValue={note.data.note} ref={'txtNoteEdit'}/></td>
                                    <td><select className="form-control" ref={'slLevelEdit'} defaultValue={note.data.level}>
                                        <option value="high"> high</option>
                                        <option value="medium"> medium</option>
                                        <option value="low"> low</option>
                                    </select>
                                    </td>
                                    <td>
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-info" onClick={() => {
                                                this.pressedSaveEditButton(note.key)
                                            }}>Save
                                            </button>
                                            <button type="button" className="btn btn" onClick={() => {
                                                this.pressedCancelEditButton()
                                            }}>Cancel
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        }
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default connect((state)=>{
    return {
        listNote: state.listNote,
    };
})(List);