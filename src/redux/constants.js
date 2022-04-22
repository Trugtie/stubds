export const API_URL="https://realestatebk.herokuapp.com/";

export const HTTP_STATUS = Object.freeze({
    PENDING: 'PENDING',
    FULFILLED: 'FULFILLED',
    REJECTED: 'REJECTED',
    BLOCKED: 'BLOCKED',
    DELETED: 'DELETED',
    DELETE_FAILED: 'DELETE_FAILED',
    EDITED: 'EDITED',
    EDIT_FAILED: 'EDIT_FAILED',
    INSERTED: 'INSERTED',
    INSERT_FAILED: 'INSERT_FAILED',
})

export const validEmail = new RegExp(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/);
 export const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');
 export const validUsername= new RegExp("^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$");