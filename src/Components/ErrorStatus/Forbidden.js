import React, {useState} from "react";
import {TabMenu} from 'primereact/tabmenu';
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import {useLocation} from "react-router-dom";
import axios from "../../Axios/AxiosInstance";

export default function Forbidden() {
    const location = useLocation();
    const role = location.state?.role;
    const id = location.state?.ID;
    const name = location.state?.name;

    return (
        <div className="App mt-5">
            <i className="pi pi-exclamation-triangle flex justify-content-center"></i>
            <h1 className="text-2xl font-normal text-center ml-3">
                403 - Forbidden
            </h1>
            <p className="text-2xl font-normal text-center ml-3">
                Your are not authorized to access this page.
            </p>
        </div>
    )
}