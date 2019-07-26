import { userConstants } from '../constants/user.constants';
import { notesConstants } from '../constants/note.constants';

export function registration(state = {}, action) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { registering: true };
    case userConstants.REGISTER_SUCCESS:
      return {};
    case userConstants.REGISTER_FAILURE:
      return {};
    case notesConstants.REGISTER_REQUEST:
      return { registering: true };
    case notesConstants.REGISTER_SUCCESS:
      return {};
    case notesConstants.REGISTER_FAILURE:
      return {};
    default:
      return state
    
  }
}