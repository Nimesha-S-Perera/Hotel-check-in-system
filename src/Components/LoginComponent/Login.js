import React, {useState} from 'react';
import axios from '../../Axios/AxiosInstance';
import {InputText} from "primereact/inputtext";
import {Button} from 'primereact/button';
import {Card} from "primereact/card";
import {useNavigate} from "react-router-dom";
import {User} from "../User";
import CryptoJS from 'crypto-js';
import {useSession} from "react-session";

function Login() {
    const [employeeID, setEmployeeID] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [role, setRole] = useState('');
    const [id, setId] = useState('');

    const naviagate = useNavigate();

//set session data

    // function SetSessionData({name, roleType, token, roleID}) {
    //     const {session} = useSession();
    //     session.set('user', {
    //         name: name,
    //         roleType: roleType,
    //         token: token,
    //         roleID: roleID
    //     });
    //     sessionStorage.setItem(session);
    // }

    //Login endpoint
    const handleLogin = (event) => {
        event.preventDefault();
        validationForm();
        axios.post('/login', {
            employeeID: employeeID,
            password: password
        })
            .then(response => {
                const token = response.data.access_token;
                const roleType = response.data.roleType;
                const name = response.data.name;
                const roleID = response.data.roleID;
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                setError('');
                console.log(response.data);
                // SetSessionData({name,token,roleType,roleID});
                const secretKey = 'gg34ggfydsfgh4387923gje980234wr335';
                const encryptedToken = CryptoJS.AES.encrypt(token, secretKey).toString();
                const encryptedRoleType = CryptoJS.AES.encrypt(roleType, secretKey).toString();
                const encryptedRoleName = CryptoJS.AES.encrypt(name, secretKey).toString();
                //localStorage.setItem('userToken', encryptedToken);
                const user = new User(encryptedRoleName, encryptedRoleType, encryptedToken, roleID);
                localStorage.setItem('user', JSON.stringify(user));
                naviagate("/checkin");
            })
            .catch(error => {
                setError(error.response.data.message);
            });
    };

    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
        window.history.go(1);
    };

    function validationForm() {
        if (!employeeID && !password) {
            setError("Please enter your employee ID and password.");
        } else if (!employeeID) {
            setError("Please enter your employee ID.");
        } else if (!password) {
            setError("Please enter your password.");
        } else {
            setError("");
        }
    };

    return (
        <div className="App overflow-hidden">
            <div className="formgrid grid ">
                <div className="field col-12 md:col-3 text-sm">
                </div>
                <div className="field col-12 md:col-6 text-sm flex justify-content-center">
                    <Card style={{height: '100vh'}} className="mt-3 w-30rem ">
                        <h1 className="m-0 text-2xl mb-4 text-center mt-5">ABC Hotel</h1>
                        <p className="m-0 text-lg font-normal mb-4 text-center">Hotel Management System</p>
                        <form onSubmit={handleLogin} className="pl-2 pr-2 lg:pl-4 lg:pr-4">
                            <label className="flex flew-row gap-1 mt-8 text-base" htmlFor="name">
                                Employee ID
                            </label>
                            <InputText
                                id="name"
                                className="p-field w-full mt-2"
                                name="name"
                                placeholder="Enter your employee ID"
                                value={employeeID}
                                onChange={(event) => setEmployeeID(event.target.value)}
                            />
                            <label className="flex flew-row gap-1 mt-6 text-base" htmlFor="nic">
                                Password
                            </label>
                            <InputText
                                id="nic"
                                className="p-field w-full mt-2"
                                placeholder="Enter your password"
                                type="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            <Button label="Login" type="submit" size="small" className="p-field w-full mt-6 text-base"/>
                            {error && <p className="text-red-500 text-center">{error}</p>}
                        </form>
                    </Card>
                </div>
                <div className="field col-12 md:col-3 text-sm ">
                </div>
            </div>
        </div>
    );
}

export default Login;
