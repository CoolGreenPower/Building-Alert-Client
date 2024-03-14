// import {
//     EDIT_CURR_PAGE,
//     ADD_TOKEN,
//     REMOVE_TOKEN,
//     ADD_SITE_NAME,
//     UPDATE_ALERT_CATEGORY,
//     SAVE_CURR_USERID
// } from "../constants/constants"

// const initialState = {
//     currPage: 'buildingAlerts',
//     token: localStorage.getItem('token'),
//     isSession: false,
//     siteName: '',
//     alertCategory: '',
//     userId: '',
//     adminDataCategory: '',
//     username: '',
//     parentBuilding: ''
// }

// const reducer = (state = initialState, action) => {
//     switch (action.type) {

//         case EDIT_CURR_PAGE:
//             return {
//                 currPage: action.currPage
//             }

//         case ADD_TOKEN: {
//             // console.log("token in reducer: ", action.token)
//             localStorage.setItem('token', action.token)
//             return {
//                 token: localStorage.getItem('token'),
//                 isSession: true
//             }

//         }
//         case REMOVE_TOKEN:
//             return {
//                 token: null,
//                 isSession: false
//             }

//         case ADD_SITE_NAME:
//             console.log(`site name: ${action.name}`)
//             console.log(`username: ${state.username}`)
//             console.log(`parentBuilding: ${state.parentBuilding}`)
//             console.log(`buildingId: ${state.buildingId}`)

//             return {
//                 siteName: action.name,
//                 userId: state.userId,
//                 username: state.username,
//                 parentBuilding: action.parentBuilding,
//                 buildingId: action.buildingId
//             }

//         case UPDATE_ALERT_CATEGORY:
//             console.log('UPDATE_ALERT_CATEGORY')
//             return {
//                 siteName: state.siteName,
//                 alertCategory: action.alertCategory,
//                 userId: state.userId,
//                 username: state.username
//             }

//         case SAVE_CURR_USERID:
//             console.log('Saving username', action.username)
//             return {
//                 userId: action.userId,
//                 username: action.username
//             } 

//         default:
//             return state
//     }
// }

// export default reducer


import {
    EDIT_CURR_PAGE,
    ADD_TOKEN,
    REMOVE_TOKEN,
    ADD_SITE_NAME,
    UPDATE_ALERT_CATEGORY,
    SAVE_CURR_USERID,
    SAVE_LOGIN_RESPONSE
} from "../constants/constants"

const initialState = {
    currPage: 'buildingAlerts',
    // token: localStorage.getItem('token'),
    isSession: false,
    siteName: '',
    alertCategory: '',
    userId: '',
    adminDataCategory: '',
    username: '',
    parentBuilding: '',
    loginResponse: {} // Add this line to initialize loginResponse state
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        // other cases...
        case SAVE_LOGIN_RESPONSE:
            return {
                ...state,
                loginResponse: action.data
            }
        default:
            return state
    }
}


export default reducer;
