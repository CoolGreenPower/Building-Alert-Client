import { createTheme } from '@material-ui/core/styles';
// String constants
export const APP_TITLE = 'myBuilding Alerts';
export const EDIT_CURR_PAGE = "EDIT_CURR_PAGE"
export const ADD_TOKEN = "ADD_TOKEN"
export const REMOVE_TOKEN = "REMOVE_TOKEN"
export const ADD_SITE_NAME = "ADD_SITE_NAME"
export const SAVE_CURR_USERID = "SAVE_CURR_USERID"
export const UPDATE_ALERT_CATEGORY = "UPDATE_ALERT_CATEGORY"
export const UPDATE_ADMIN_CATEGORY = "UPDATE_ADMIN_CATEGORY"


// API constants

export const LOCAL_HOST = `http://localhost:8080`
export const PORT = `8080`
export const PROD_API = "https://mybuildingalerts.herokuapp.com"
export const BASE_URL = 'https://buildingassure.azurewebsites.net';
export const BASE_URL_DEV = 'https://buildingassure.azurewebsites.net';

//  Storage Keys

export const SAVE_LOGIN_RESPONSE = 'SAVE_LOGIN_RESPONSE';


export const theme = createTheme({
    palette: {
        primary: {
            main: '#07502d',
            primaryColor: '#0E512E',
            whitesmoke: '#f5f5f5',
            appbarBorder: '#707070',
            tabBorder: '#EBEBEB',
            tabSurface: '#F7F7F7',
            brown: '#6F6F6F',
            alert: '#FDF4F4',
            tabUnselected: '#868686',
        },
    },
});

export const colors = {
    main: '#07502d',
    primaryColor: '#0E512E',
    whitesmoke: '#f5f5f5',
    appbarBorder: '#707070',
    tabBorder: '#EBEBEB',
    tabSurface: '#F7F7F7',
    brown: '#6F6F6F',
    alert: '#FDF4F4',
    tabUnselected: '#868686',
    alertText: '#FF0000',
    alertBackground: '#FFC2AC',
    green: "#296200",
    greenBackground: "#CBFFC1",
    lowText:"#FF8900",
    lowBackground:"#FEE3C1",
};


export const camelCase = (str) => {
    return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
  };