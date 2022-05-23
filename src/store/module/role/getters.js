/* eslint-disable */

import { GET_USER_TOKEN_GETTER, GET_USER_EMAIL, IS_USER_VERIFIED_GETTER, GET_USER_NAME, GET_USER_DATA } from "../../storeConstants"

export default {
    [IS_USER_VERIFIED_GETTER] : (state) => {return state.verifiedAt},
    [GET_USER_DATA] : (state) => {return state.token
    }
}
