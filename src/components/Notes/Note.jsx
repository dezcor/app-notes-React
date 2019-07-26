import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import './Note.css';

class Note extends Component
{
    constructor(props)
    {
        super(props);
        this.noteId = props.noteId;
        this.noteTitle = props.noteTitle;
        this.noteContent = props.noteContent;
        this.noteDate = this.formatDate(new Date(props.noteDate));
    }

    formatDate(date) {
        var monthNames = [
          "January", "February", "March",
          "April", "May", "June", "July",
          "August", "September", "October",
          "November", "December"
        ];
      
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
      
        return day + ' ' + monthNames[monthIndex] + ' ' + year;
    }
    

    handleRemove(id)
    {
        const response = window.confirm('esta seguro de eliminar?')
        if(response)
            this.props.removeNote(id);
    }

    render()
    {
        return (
        <div className="col-md-3">
            <div id={this.noteId}className="card mt-2">
                <div className="card-header">
                    <h4>{this.noteTitle}</h4>
                </div>
                <div className="card-body">
                    <p>{this.noteContent}</p>
                    <small > {this.noteDate}</small>
                    <hr/>
                    <Link to={'/note/edit/'+this.noteId}>
                        <button className="btn btn-outline-primary btn-sm">
                            <i className="material-icons">edit</i>
                            &nbsp;
                            <span className="text-sm-center">Edit</span>
                        </button>
                    </Link>
                    &nbsp;
                    <button 
                        onClick={()=>{this.handleRemove(this.noteId)}}
                        className="btn btn-outline-danger btn-sm">
                        <i className="material-icons">delete_forever</i>
                        &nbsp;
                        <span className="text-danger text-sm-center">Delete</span>
                    </button>
                </div>
            </div>
        </div>
        );
    }
}

export default Note
