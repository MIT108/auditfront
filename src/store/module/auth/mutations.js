/* eslint-disable */

import { SET_USER_TOKEN_DATA_MUTATION, SET_USER_VERIFIED_AT_MUTATION } from "../../storeConstants";

export default{
    [SET_USER_TOKEN_DATA_MUTATION](state, payload){
        state.userName = payload.userName
        state.userEmail = payload.userEmail
        state.token = payload.token
        state.userId = payload.userId
    }
}
