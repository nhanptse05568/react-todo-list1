import React, {Component} from 'react';
import firebase from '../api/api';

export default class Add extends Component {
    notes;
    database;
    constructor(props) {
        super(props);
        this.state = {
            isAdding: false,
        };
        this.database = firebase.database();
        this.notes = this.database.ref('Notes');
    }

    pressedAddTaskButton(){
        this.setState({
            isAdding: true,
        });
    }
    pressedAddTaskButtonToClose(){
        this.setState({
            isAdding: false,
        });
    }

    pressedAddButton(){
        if(this.refs.txtNote.value === ''){
            alert('Note must not be empty');
        } else {
            this.notes.push({
                note: this.refs.txtNote.value,
                level: this.refs.slPriority.value,
            }, () => {
                alert('success');
            })
                .catch((error) => {
                    alert('failed, reason: ' + error.message)
                });
            this.setState({
                isAdding: false,
            });
        }
    }

    render() {
        if (this.state.isAdding) {
            return (
                <div>
                    <button className="btn btn-primary" onClick={()=>{this.pressedAddTaskButtonToClose()}}>Add Task</button>
                    <div>
                        <input type="text" className="form-control" ref={'txtNote'} placeholder={'Enter Note'}/>
                        <select className="form-control" ref={'slPriority'}>
                        	<option value="high"> High </option>
                        	<option value="medium"> Medium </option>
                        	<option value="low"> Low </option>
                        </select>
                        <button className="btn btn-success" onClick={()=>{this.pressedAddButton()}}>Add</button>
                        <button  className="btn btn-danger" onClick={()=>{this.pressedAddTaskButtonToClose()}}>Cancel</button>
                    </div>
                </div>
            );
        } else {
            return (
                <button className="btn btn-primary" onClick={()=>{this.pressedAddTaskButton()}}>Add Task</button>
            );
        }
    }
}