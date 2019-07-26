import React, {Component} from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { noteActions } from '../../actions/note.actions';

class NewNote extends Component{

    constructor(props) {
        super(props);

        this.state = {
            note:{
                title: '',
                note: ''
        },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(e) {
        const { name, value } = e.target;
        const {note} = this.state;
        this.setState({ 
            note:{
                ...note,
                [name]: value
            }
        });
    }

   async handleSubmit(e) {
        e.preventDefault();
        
        await this.setState({ submitted: true });
        if ( this.isValidForm() ) {
            this.props.register(this.state.note);
        }
    }

    isValidForm = ()=>{
        const { title, note } = this.state.note;
        const { submitted } = this.state;
        return ( submitted && title && note );
    }
    render(){
        const { title, note } = this.state.note;
        const { submitted } = this.state;

        const isValidTitle = (submitted && !title);
        const isValidNote= (submitted && !note);

        return (
            <div className="container p-4">
                   <div className="row">
                        <div className="col-md-4 offset-md-4">
                            <div className="card">
                                <h1 className="text-center">Register</h1>
                                <div className="card-body">
                                {/** form */}
                                <form name="form" onSubmit={this.handleSubmit}>
                                    <div className={'form-group' + ( isValidTitle? ' has-danger' : '')}>
                                        <label >Title</label>
                                        <input value={title} 
                                            onChange={this.handleChange} 
                                            type="text" 
                                            name="title" 
                                            className={"form-control"+ (isValidTitle ? ' is-invalid' : '')}
                                            aria-describedby="emailHelp" 
                                            placeholder="Enter Title"/>
                                        { isValidTitle &&
                                            <div className="invalid-feedback">Title is required</div>
                                        }
                                    </div>
                                    <div className={'form-group' + ( isValidTitle? ' has-danger' : '')}>
                                        <label >Email</label>
                                        <textarea value={note} 
                                            onChange={this.handleChange}
                                            type="text" 
                                            name="note" cols="30" rows="10"
                                            className={"form-control"+ (isValidNote ? ' is-invalid' : '')} 
                                            aria-describedby="emailHelp" 
                                            placeholder="Enter Note"/>
                                        { isValidNote && 
                                            <div className="invalid-feedback">Note content is required</div>   
                                        }
                                    </div>
                                    <div className="col-md-12 text-justify">
                                        <button type="submit" className = "btn btn-primary tx-tfm">Create</button>
                                        &nbsp;
                                        <Link to={'/'}>
                                            <button className="btn btn-danger btn-sm">
                                                <i className="material-icons">highlight_off</i>
                                            </button>
                                        </Link>
                                    </div>
                                </form>  
                                </div>
                            </div>
                        </div>
                   </div> 
            </div>
        ) 
    }
}

function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: noteActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators)(NewNote);
export { connectedRegisterPage as NewNote };
