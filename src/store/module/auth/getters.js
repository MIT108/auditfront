/* eslint-disable */

import { GET_USER_EMAIL, GET_USER_NAME, GET_USER_TOKEN_GETTER, IS_USER_AUTHENTICATED_GETTER, IS_USER_VERIFIED_GETTER } from "../../storeConstants"

export default {
    [GET_USER_TOKEN_GETTER] : (state) => {return state.token},
    [IS_USER_AUTHENTICATED_GETTER] : (state) => {return !!state.token},
    [IS_USER_VERIFIED_GETTER] : (state) => {return state.verifiedAt},
    [GET_USER_NAME] : (state) => {
      return state.userName},
    [GET_USER_EMAIL] : (state) => {return state.userEmail},
}
