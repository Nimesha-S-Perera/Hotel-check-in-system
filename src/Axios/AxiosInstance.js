import axios from 'axios';
import {config} from "../config/config";

const instance = axios.create({
    withCredentials: true,
    baseURL: `${config.ABC_hotel_check_in_system}`,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
});
/*
const token = localStorage.getItem('token');
if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const roleType = localStorage.getItem('roleType');
if (roleType) {
    instance.defaults.headers.common['roleType'] = roleType;
}
*/

export default instance;