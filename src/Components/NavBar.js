import React, {useState} from "react";
import {TabMenu} from 'primereact/tabmenu';
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import {useLocation} from "react-router-dom";
import axios from "../Axios/AxiosInstance";
import CryptoJS from 'crypto-js';

export default function NavBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    //Decrypt the user data
    const sesssion = JSON.parse(localStorage.getItem('user'));
    const secretKey = 'gg34ggfydsfgh4387923gje980234wr335';
    const accessToken = CryptoJS.AES.decrypt(sesssion.access_token, secretKey);
    const token = accessToken.toString(CryptoJS.enc.Utf8);
    const decryptedRoleType = CryptoJS.AES.decrypt(sesssion.roleType, secretKey);
    const roleType = decryptedRoleType.toString(CryptoJS.enc.Utf8);
    const decryptedName = CryptoJS.AES.decrypt(sesssion.name, secretKey);
    const name = decryptedName.toString(CryptoJS.enc.Utf8);


    //Logout Endpoint
    const handleLogout = () => {
        if(localStorage.getItem('user')) {

            const config = {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
            axios.post('/logout', {},config)
                .then(response => {
                    localStorage.removeItem('user');
                    delete axios.defaults.headers.common['Authorization'];
                    console.log(response.data.message);
                    navigate('/');
                })
                .catch(error => {
                    console.log(error.response.data.message);
                });
        }else{
            navigate('/');
        }

    }

    return (
        <div className="grid surface-200">
            <div className="col-12 md:col-6 lg:col-3">
                <h1 className="text-2xl font-semibold ml-3">
                    ABC Hotel
                </h1>
            </div>
            <div
                className="col-12 md:col-6 lg:col-5 flex flex-row lg:gap-8 md:gap-3 gap-3 justify-content-center align-self-center">
                <Link to="/checkin" className="text-base font-normal no-underline text-color">Check In</Link>
                {roleType == 'Officer' ? (
                        null) :
                    <Link to="/rooms" className="text-base font-normal no-underline text-color">Rooms</Link>}
                {roleType == 'Officer' ? (
                        null) :
                    <Link to="/suites" className="text-base font-normal no-underline text-color">Suites & Price</Link>}
                {roleType == 'Supervisor' || roleType == 'Officer' ? (
                    null
                ) : <Link to="/user" className="text-base font-normal no-underline text-color">Users</Link>}
            </div>
            <div
                className="col-12 md:col-12 lg:col-4 flex flex-row align-content-center justify-content-center pr-6 md:justify-content-end">
                <p className="text-xs lg:text-sm font-normal no-underline ml-5 align-self-center">{name} - {roleType}</p>
                <p className="text-xs lg:text-sm font-normal no-underline ml-5 align-self-center">|</p>
                <label
                    className="text-xs lg:text-sm font-normal no-underline ml-5 align-self-center text-red-500 cursor-pointer"
                    onClick={handleLogout}>Log out</label>
            </div>
        </div>
    )
}
