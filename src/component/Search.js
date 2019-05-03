import React, {Component} from 'react';
import firebase from '../api/api';
import {connect} from 'react-redux';

class Search extends Component {
    database;
    notes;

    constructor(props) {
        super(props);
        this.database = firebase.database();
        this.notes = this.database.ref('Notes');
    }

    searchFunction() {
        this.props.dispatch({
            type : 'search',
            searchValue: this.refs.txtSearch.value,
        });
    }

    render() {
        return (
            <div className="form-group">
                <div className="col-sm-offset-0 col-sm-10">
                    <input type="text" ref={'txtSearch'}
                           onChange={()=>{this.searchFunction()}}
                    />
                </div>
            </div>
        );
    }
}


export default connect()(Search);