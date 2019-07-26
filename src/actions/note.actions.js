import { notesConstants } from '../constants/note.constants';
import { noteService } from '../services/Note.service';
import { alertActions } from './alert.actions';
import { history } from '../helpers/history';

export const noteActions = {
    register,
    update,
    getAll,
    getOne,
    delete: _delete
};

function register(note) {
    return dispatch => {
        dispatch(request(note));

        noteService.register(note)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(note) { return { type: notesConstants.REGISTER_REQUEST, note } }
    function success(note) { return { type: notesConstants.REGISTER_SUCCESS, note } }
    function failure(error) { return { type: notesConstants.REGISTER_FAILURE, error } }
}

function update(note) {
    return dispatch => {
        dispatch(request(note));

        noteService.update(note)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/');
                    dispatch(alertActions.success('Update successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(note) { return { type: notesConstants.UPDATE_REQUEST, note } }
    function success(note) { return { type: notesConstants.UPDATE_SUCCESS, note } }
    function failure(error) { return { type: notesConstants.UPDATE_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        noteService.getAll()
            .then(
                notes => dispatch(success(notes)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: notesConstants.GETALL_REQUEST } }
    function success(notes) { return { type: notesConstants.GETALL_SUCCESS, notes } }
    function failure(error) { return { type: notesConstants.GETALL_FAILURE, error } }
}

function getOne(id) {
    return dispatch => {
        dispatch(request());

        noteService.getById(id)
            .then(
                note => dispatch(success(note)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: notesConstants.GETONE_REQUEST } }
    function success(note) { return { type: notesConstants.GETONE_SUCCESS, note } }
    function failure(error) { return { type: notesConstants.GETONE_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        noteService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(_id) { return { type: notesConstants.DELETE_REQUEST, _id } }
    function success(_id) { return { type: notesConstants.DELETE_SUCCESS, _id } }
    function failure(_id, error) { return { type: notesConstants.DELETE_FAILURE, id, error } }
}