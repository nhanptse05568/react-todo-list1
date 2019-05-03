import React, {Component} from 'react';
import Search from './component/Search';
import Add from './component/Add';
import List from './component/List';
import firebase from './api/api';
import {Provider} from 'react-redux';
import {store} from '../src/redux/store/store';

class App extends Component {
    database;
    notes;

    constructor(props) {
        super(props);
        this.database = firebase.database();
        this.notes = this.database.ref('Notes');
    }


    componentWillMount() {
        this.notes.on('value', (snap) => {
            data = [];
            snap.forEach((eachData) => {
                data.push({
                    key: eachData.key,
                    data: eachData.val(),
                });
            });
            store.dispatch({
                type: 'updateListNoteFromServer',
                newData: data,
            });
        })
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <div className="page-header">
                        <h1 style={{marginLeft: 75}}>TODO List
                            <small> Nhan</small>
                        </h1>
                    </div>
                    <div>
                        <Search/>
                    </div>
                    <div>
                        <Add/>
                    </div>
                    <div>
                        <List/>
                    </div>
                </div>
            </Provider>
        );
    }
}

export default App;


export let data = [];

