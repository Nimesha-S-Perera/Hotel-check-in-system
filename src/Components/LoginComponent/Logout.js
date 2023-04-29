import React, {useState} from "react";
import {TabMenu} from 'primereact/tabmenu';
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import {useLocation} from "react-router-dom";
import axios from "../../Axios/AxiosInstance";
import CryptoJS from 'crypto-js';

export const LogoutFunction = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const name = storedUser.name;
    const roleType = storedUser.roleType;

    //Logout Endpoint
    const handleLogout = () => {
        if(localStorage.getItem('user')) {

            const sesssion = JSON.parse(localStorage.getItem('user'));
            const secretKey = 'gg34ggfydsfgh4387923gje980234wr335';
            const bytes = CryptoJS.AES.decrypt(sesssion.access_token, secretKey);
            const token = bytes.toString(CryptoJS.enc.Utf8);

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
            <div
                className="col-12 md:col-12 lg:col-4 flex flex-row align-content-center justify-content-center pr-6 md:justify-content-end">
                <p className="text-xs lg:text-sm font-normal no-underline ml-5 align-self-center">{name} - {roleType}</p>
                <p className="text-xs lg:text-sm font-normal no-underline ml-5 align-self-center">|</p>
                <label
                    className="text-xs lg:text-sm font-normal no-underline ml-5 align-self-center text-red-500 cursor-pointer"
                    onClick={handleLogout}>Log out</label>
            </div>
    )
}
