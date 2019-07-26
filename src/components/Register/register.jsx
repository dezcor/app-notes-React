import React, {Component} from 'react';
import './register.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../actions/user.actions';

class register extends Component{

    constructor(props) {
        super(props);

        this.state = {
            user:{username: '',
            password: '',
            email: ''
        },
            submitted: false
        };
        this.isEmail='\\'
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateEmail = (email) =>{
        var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return re.test(email);
      }
    handleChange(e) {
        const { name, value } = e.target;
        const {user} = this.state;
        this.setState({ 
            user:{
                ...user,
                [name]: value
            }
        });
    }

    async handleSubmit(e) {
        e.preventDefault();

        await this.setState({ submitted: true });
        if ( this.isValidForm()) {
            this.props.register(this.state.user)
        }
    }
    isValidForm = ()=>{
        const { username, password, email } = this.state.user;
        const { submitted } = this.state;
        return ( submitted && username && password && this.validateEmail(email));
    }
    render(){
        const { username, password, email } = this.state.user;
        const { submitted } = this.state;

        const isvalidUsername = (submitted && !username);
        const isValidpassword = (submitted && !password);
        const isValidEmail = (submitted && !email);
        const isRequier = isValidEmail || ( submitted && !this.validateEmail(email) && email.length >0);
        return (
            <div className="container p-4">
                   <div className="row">
                        <div className="col-md-4 offset-md-4">
                            <div className="card">
                                <h1 className="text-center">Register</h1>
                                <div className="card-body">
                                {/** form */}
                                <form name="form" onSubmit={this.handleSubmit}>
                                    <div className={'form-group' + ( isvalidUsername? ' has-danger' : '')}>
                                        <label >Username</label>
                                        <input value={username} 
                                            onChange={this.handleChange} 
                                            type="text" 
                                            name="username" 
                                            className={"form-control"+ (isvalidUsername ? ' is-invalid' : '')}
                                            aria-describedby="emailHelp" 
                                            placeholder="Enter Username"/>
                                        { isvalidUsername &&
                                            <div className="invalid-feedback">Username is required</div>
                                        }
                                    </div>
                                    <div className={'form-group' + ( isValidEmail? ' has-danger' : '')}>
                                        <label >Email</label>
                                        <input value={email} 
                                            onChange={this.handleChange}
                                            type="mail" 
                                            name="email" 
                                            className={"form-control"+ (isRequier ? ' is-invalid' : '')} 
                                            aria-describedby="emailHelp" 
                                            placeholder="Enter email"/>
                                        { isRequier && 
                                            <div className="invalid-feedback">{isValidEmail?"Email is required":'Email is not valid'}</div>   
                                        }
                                    </div>
                                    <div className={'form-group' + (isValidpassword ? ' has-danger' : '')}>
                                        <label >Password</label>
                                        <input value={password} 
                                            onChange={this.handleChange} 
                                            type="password" 
                                            name="password" 
                                            className={"form-control" + (isValidpassword ? ' is-invalid' : '')} 
                                            aria-describedby="emailHelp" 
                                            placeholder="Enter Password"/>
                                        { isValidpassword &&
                                            <div className="invalid-feedback">Password is required</div>
                                        }
                                    </div>
                                    <div className="col-md-12 text-justify">
                                        <button type="submit" className = "btn btn-primary tx-tfm">Login</button>
                                        &nbsp;
                                        <Link to={'/login'}>
                                            Cancel
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
    register: userActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators)(register);
export { connectedRegisterPage as register };
