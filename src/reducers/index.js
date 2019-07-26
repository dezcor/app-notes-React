import { combineReducers } from 'redux';

import { authentication } from './autentication.reducer';
import { registration } from './registration.reducer';
import { users } from './user.reducer';
import { notes } from './note.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  notes,
  alert
});

export default rootReducer;