/* eslint-disable spaced-comment */
/* eslint-disable semi */
//Authentication constants
export const TEST = 'test';
export const LOGIN_ACTION = '[action] login';
export const LOGOUT_ACTION = '[action] logout';
export const AUTH_ACTION = '[action] user auth'
export const AUTO_LOGIN_ACTION = '[action] auth auto login'
export const IS_USER_VERIFIED_ACTION = '[action] check if user is verified'
export const VERIFYING_USER_ACTION = '[action] verifying user account'
export const GET_USER_TOKEN_GETTER = '[getters] get the auth user token';
export const SET_USER_TOKEN_DATA_MUTATION = '[mutation] add token to state'
export const SET_USER_VERIFIED_AT_MUTATION = '[mutation] update verifiedAt'
export const IS_USER_AUTHENTICATED_GETTER = '[getter] check if user is authenticated'
export const IS_USER_VERIFIED_GETTER = '[getter] check if user is verified'
export const GET_USER_NAME = '[getter] get user name'
export const GET_USER_EMAIL = '[getter] get user email'

//user constants
export const UPDATE_USER_INFORMATION = '[action] update user information'
export const CREATE_NEW_USER = '[action] create new user'

//role constants
export const CREATE_NEW_ROLE = '[action] create new role'
export const LIST_ALL_ROLE = '[action] list all roles'
export const UPDATE_ROLE = '[action] update role'
export const DELETE_ROLE = '[action] delete role'
export const LIST_TOTAL_ROLE = '[action] list total roles'

//courier constants
export const CREATE_COURIER = '[action] create'
