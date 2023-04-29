import React, {useEffect, useState, useRef} from "react";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
// import {config} from "../config/config";
import axios from '../../Axios/AxiosInstance';
import {Dropdown} from "primereact/dropdown";
import {Toast} from 'primereact/toast';
import {Card} from 'primereact/card';
import AsteriskSign from '../BookingComponent/AsteriskSign';
import {EmployeeIDValidation} from "../../Validations/EmployeeIDValidation";
import {RoleTypeValidation} from "../../Validations/RoleTypeValidation";
import {NameValidation} from "../../Validations/NameValidation";
import {ContactNumberValidation} from "../../Validations/ContactNumberValidation";
import {PasswordValidation} from "../../Validations/PasswordValidation";
import {UsersDataTable, FetchData} from "./UsersDataTable";
import {RoleList} from "../../Utilities/RoleList";


export default function ModalForUser({onClick}, props) {

    //Toasts
    const toast = useRef(null);
    const showSuccess = () => {
        toast.current.show({
            severity: 'success',
            summary: 'Success',
            detail: 'User checked-in successfully',
            life: 3000
        });
    }
    const showWarn = () => {
        toast.current.show({severity: 'warn', summary: 'Warning', detail: 'Incomplete Progress', life: 3000});
    }
    
    const [visible, setVisible] = useState(false);
    const [employeeID, setEmployeeID] = useState('');
    const [name, setName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');

    //To validate data
    const [onEmployeeIDError, setonEmployeeIDError] = useState('');
    const [onRoleTypeError, setonRoleTypeError] = useState('');
    const [onNameError, setOnNameError] = useState('');
    const [onContactNumberError, setonContactNumberError] = useState('');
    const [onPasswordError, setonPasswordError] = useState('');


    const footerContent = (
        <div>
            <Button label="Add New User" type="submit" onClick={() => setVisible(false)}/>
        </div>
    );
    

    const handleRoleTypeChange = (event) => {
        setRole(event.value);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            return
        }
        console.log(role);
        const data = {
            employeeID: employeeID,
            name: name,
            contactNumber: contactNumber,
            roleID:role,
            status:0,
            password: password,
        };
        console.log(data)
        try {
            const response = await axios.post(
                `/user`,
                data
            )
            .then(response => {
                console.log('User updated Successfully',  response.data);
                setEmployeeID("");
            setName("");
            setContactNumber("");
            setRole("");
            setPassword("");
            console.log(response);
            onClick()
            showSuccess();
            setVisible(false);
            })
            .catch(error => {
                console.error('Error updating user.', error);
            });
        
        } catch (error) {
            console.error(error);
            showWarn();
        }
    };

    //Validation

    function validateEmployeeID() {
        const error = EmployeeIDValidation(employeeID);
        setonEmployeeIDError(error);
    }

    function validateRoleType() {
        const error = RoleTypeValidation(role);
        setonRoleTypeError(error);
    }
    
    function validateName() {
        const error = NameValidation(name);
        setOnNameError(error);
    }

    function validateContactNumber() {
        const error = ContactNumberValidation(contactNumber);
        setonContactNumberError(error);
    }

    function validatePassword() {
        const error = PasswordValidation(password);
        setonPasswordError(error);
    }

    function validateForm() {
        validateName();
        validateContactNumber();
    }

    return (
        <div className="card flex justify-content-center w-50rem">
            <Button
                label="Add New User"
                size="small"
                onClick={() => setVisible(true)}
            />
            <Dialog
                header="Add New User"
                className="text-xl font-normal"
                size="small"
                visible={visible}
                style={{width: "50rem"}}
                onHide={() => setVisible(false)}
            >
                <Card>
                    <p className="m-0 text-base mb-4 font-normal">User Information</p>
                    <form onSubmit={handleSubmit} method="POST" action={""}>
                        <div className="card">
                            <div className="formgrid grid ">
                                <div className="field col-12 md:col-4 text-sm">
                                    <label className="flex flew-row gap-1" htmlFor="employeeID">
                                        Employee ID
                                        <AsteriskSign/>
                                    </label>
                                    <InputText
                                        id="employeeID"
                                        className="p-field w-full"
                                        name="employeeID"
                                        value={employeeID}
                                        onKeyUp={validateEmployeeID}
                                        onChange={(event) => setEmployeeID(event.target.value)}
                                    />
                                    {onEmployeeIDError !== '' ? (
                                            <label className="text-red-500" htmlFor="name">
                                                {onEmployeeIDError}
                                            </label>) : null}
                                </div>
                                <div className="field col-12 md:col-4 text-sm">
                                    <label className=" flex flew-row gap-1" htmlFor="role">
                                        Role
                                        <AsteriskSign/>
                                    </label>
                                    <div className="card flex justify-content-center flex-column">
                                        <Dropdown
                                            value={role}
                                            options={Object.entries(RoleList).map(([key, value]) => ({
                                                label: value,
                                                value: key
                                            }))}
                                            onChange={handleRoleTypeChange}
                                            onSelect={validateRoleType}
                                            optionLabel="label"
                                            optionValue="value"
                                            placeholder="Select"
                                            className="w-full md:w-14rem"
                                            defaultValue={null}
                                        />
                                        {onRoleTypeError !== '' ? (
                                            <label className="text-red-500" htmlFor="name">
                                                {onRoleTypeError}
                                            </label>) : null}
                                    </div>
                                </div>
                                <div className="field col-12 md:col-4 text-sm">
                                    <label className="flex flew-row gap-1" htmlFor="name">
                                        Name
                                        <AsteriskSign/>
                                    </label>
                                    <InputText
                                        id="name"
                                        className="p-field w-full"
                                        value={name}
                                        onKeyUp={validateName}
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                    {onNameError !== '' ? (
                                        <label className="text-red-500" htmlFor="name">
                                            {onNameError}
                                        </label>) : null}
                                </div>
                            </div>
                            <p className="m-0 text-base mt-3 mb-4">Check In Details</p>
                            <div className="formgrid grid">
                                <div className="field col-12 md:col-4 text-sm">
                                    <label className="flex flew-row gap-1" htmlFor="contactNumber">
                                        Contact Number
                                        <AsteriskSign/>
                                    </label>
                                    <InputText
                                        id="contactNumber"
                                        className="p-field w-full"
                                        value={contactNumber}
                                        onKeyUp={validateContactNumber}
                                        onChange={(event) => setContactNumber(event.target.value)}
                                    />
                                    {onContactNumberError !== '' ? (
                                        <label className="text-red-500" htmlFor="name">
                                            {onContactNumberError}
                                        </label>) : null}
                                </div>
                                <div className="field col-12 md:col-4 text-sm">
                                    <label className="flex flew-row gap-1" htmlFor="password">
                                        Password
                                        <AsteriskSign/>
                                    </label>
                                    <InputText
                                        id="password"
                                        className="p-field w-full"
                                        value={password}
                                        onKeyUp={validatePassword}
                                        onChange={(event) => setPassword(event.target.value)}
                                    />
                                    {onPasswordError !== '' ? (
                                        <label className="text-red-500" htmlFor="name">
                                            {onPasswordError}
                                        </label>) : null}
                                </div>

                            </div>
                        </div>
                        <div className="card flex justify-content-end">
                            <Toast ref={toast}/>
                            <div className="flex flex-wrap gap-2">
                                <Button
                                    label="Add User"
                                    footer={footerContent}
                                    size="small"
                                    className="bg-primary outline-none"/>
                            </div>
                        </div>
                    </form>
                </Card>
            </Dialog>
        </div>
    );
};
