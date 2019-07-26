import React, {Component} from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../actions/user.actions';

class LoginPage extends Component{

    constructor(props) {
        super(props);

        this.props.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            this.props.login(username,password);
        }
    }

    render(){
        //const { loggingIn } = this.props;
        const { username, password,submitted } = this.state;
        const isvalidUsername = (submitted && !username);
        const isValidpassword = (submitted && !password);

        return (
            <div className="container p-4">
                   <div className="row">
                        <div className="col-md-4 offset-md-4">
                            <div className="card">
                                <h1 className="text-center">Login</h1>
                                <div className="card-body">
                                {/** form */}
                                <form name="form" onSubmit={this.handleSubmit}>
                                    <div className={'form-group' + ( isvalidUsername? ' has-danger' : '')}>
                                        <label >Username</label>
                                        <input value={username} onChange={this.handleChange} type="text" name="username" className={"form-control"+ (isvalidUsername ? ' is-invalid' : '')} aria-describedby="emailHelp" placeholder="Enter Username"/>
                                        { isvalidUsername &&
                                            <div className="invalid-feedback">Username is required</div>
                                        }
                                    </div>
                                    <div className={'form-group' + (isValidpassword ? ' has-danger' : '')}>
                                        <label >Password</label>
                                        <input value={password} onChange={this.handleChange} type="password" name="password" className={"form-control" + (isValidpassword ? ' is-invalid' : '')} aria-describedby="emailHelp" placeholder="Enter Password"/>
                                        { isValidpassword &&
                                            <div className="invalid-feedback">Password is required</div>
                                        }
                                    </div>
                                    <div className="col-md-12 text-justify">
                                        <button type="submit" className = "btn btn-primary tx-tfm">Login</button>
                                        &nbsp;
                                        <Link to={'/register'}>
                                            Register
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
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as Login };