import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import './Home.css';
import { connect } from 'react-redux';
import Note from '../Notes/Note';

import { noteActions } from '../../actions/note.actions'

class HomePage extends Component{

    componentDidMount() {
        this.props.getNotes();
    }

    render(){
        const { user, notes } = this.props;
        return (
            <div>
                <div className="text-center">
                    <h1>Hi {user.username}!!</h1>
                    {notes.loading && <h1 > <span className="spinner-border spinner-border-sm mr-1"></span>Loading notes...</h1>}
                </div>
                <div>
                    <Link to={'/create-note'}>
                    <button className="btn btn-primary">
                        <i className="material-icons">edit</i>&nbsp;Create Note
                    </button>
                    </Link>
                </div>
                <hr/>
                <div className="row">
                    {notes.error && <span className="text-danger">ERROR: {notes.error}</span>}
                    {notes.items && notes.items.map((note,index)=>
                    <Note
                    noteContent = {note.note}
                    noteTitle = {note.title}
                    noteId={note._id}
                    key = {note._id}
                    noteDate = {note.create_date}
                    removeNote={this.props.deleteNote}>
                    </Note>
                    )}
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { notes, authentication } = state;
    const { user } = authentication;
    return { user, notes };
}

const actionCreators = {
    getNotes: noteActions.getAll,
    deleteNote: noteActions.delete
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as Home };
