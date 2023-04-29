// import "../App.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import UsersDataTable from "./UsersDataTable";
import DialogForm from "./AddUserModal";
// import Login from "./Login";
import NavBar from "../NavBar";
import React, {useEffect, useState} from "react";

function App() {

    const [started, setStarted] = useState(false)

    return (
        <div className="App overflow-hidden">
            <NavBar/>
            <div className="grid">
                <div className=" col-12 md:col-6 lg:col-6 flex flex-row align-items-center gap-3">
                    <p className="text-xl ml-3">Users</p>
                    <DialogForm label="Add New User" size="small" onClick={() => setStarted(true)}/>
                </div>
                <div
                    className="col-12 md:col-6 md:justify-content-end lg:col-6 flex lg:justify-content-end align-items-center pl-4">
                </div>
            </div>
            <UsersDataTable started={started}/>
            <footer className="footer surface-200">
                <label className="text-xs font-medium text-center flex justify-content-center p-4">
                    Copyright 2023 | ABC HOTEL GROUP
                </label>
            </footer>
        </div>
    );
}

export default App;
