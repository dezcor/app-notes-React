import { notesConstants } from '../constants/note.constants';

export function notes(state = {}, action) {
  switch (action.type) {
    case notesConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case notesConstants.GETALL_SUCCESS:
      return {
        items: action.notes
      };
    case notesConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    case notesConstants.GETONE_REQUEST:
    return {
        loading: true
    };
    case notesConstants.GETONE_SUCCESS:
    return {
        item: action.note
    };
    case notesConstants.GETONE_FAILURE:
    return { 
        error: action.error
    };
    case notesConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(note =>
          note._id === action._id
            ? { ...note, deleting: true }
            : note
        )
      };
    case notesConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(note => note._id !== action._id)
      };
    case notesConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        items: state.items.map(note => {
          if (note._id === action._id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...noteCopy } = note;
            // return copy of user with 'deleteError:[error]' property
            return { ...noteCopy, deleteError: action.error };
          }

          return note;
        })
      };
    default:
      return state
  }
}