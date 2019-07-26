import React, {Component} from 'react';
import {Router, Route, NavLink, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';

import { Home } from './components/Home/Home';
import { Login } from './components/Login/Login';
import { register } from './components/Register/register';
import { NewNote } from './components/NewNote/NewNote';
import { editNote } from './components/editNote/editNote';

import { history } from './helpers/history';
import { alertActions } from './actions/alert.actions';
import { PrivateRoute } from './components/PrivateRouter';


class App extends Component {

  constructor(props){
    super(props);

    history.listen((location,action)=>{
      this.props.clearAlerts();
    });

  }

  render(){
    const { alert } = this.props;
    
    return (
      <div>
      <Router history={history}> 
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to={'/'}>
                Notes
            </NavLink>
            <NavLink className="nav-item nav-link" to={'/login'}>
                logout
            </NavLink>
          </div>
        </nav>
        <div className="container mt-5">
            <div>
            {alert && alert.message &&
              <div className={`alert alert-dismissible ${alert.type}`} >
                {alert.message}
                {/* <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button> */}
              </div>
            }
            </div>
            <PrivateRoute exact path = "/" component={Home} />
            <PrivateRoute path = "/create-note" component={NewNote}/>
            <PrivateRoute path ="/note/edit/:id" component={editNote} />
            <Route path="/login" component={Login}/>
            <Route path="/register" component={register}/>
            <Route path="**" render={() => <div>
              <Redirect to={'/'}></Redirect>
              </div>
            }/>
        </div>
      </Router>
      </div>
    );
  }
}

function mapState(state){
  const { alert } = state;
  return { alert };
}

const actionCreators = {
  clearAlerts: alertActions.clear
}

const connectedApp = connect(mapState,actionCreators)(App);

export { connectedApp as App};