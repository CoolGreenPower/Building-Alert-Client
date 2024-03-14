/**
 * Reusable redux functions to fetch data from and dispatch data to
 * redux store
 */


import { EDIT_CURR_PAGE, SAVE_LOGIN_RESPONSE } from "../constants/constants"

export const mapDispatchToProps = (dispatch) => ({
  updateCurrPage: (currPage) => {
    dispatch({
      type: EDIT_CURR_PAGE,
      currPage: currPage
    })
  },
  saveLoginResponse: (data) => {
    dispatch({
      type: SAVE_LOGIN_RESPONSE,
      data: data
    })
  }
})
