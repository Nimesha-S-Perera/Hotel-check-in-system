import React, {useState, useEffect, useRef} from "react";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from "primereact/dropdown";
import {InputText} from "primereact/inputtext";
import {FilterMatchMode} from 'primereact/api';
import {Card} from 'primereact/card';
import axios from '../../Axios/AxiosInstance';
import 'primeicons/primeicons.css';
import {RoleTypeList} from "../../Utilities/PermissionUtilities/RoleTypeList";
import {RoleList} from "../../Utilities/RoleList";



function UsersDataTable({started}) {
    const [users, setUsers] = useState([]);
    const [deleteUser,setDeleteUser] = useState('');
    const [user, setUser] = useState('');
    const [deleteUserDialog, setDeleteUserDialog] = useState('');

    const toast = useRef(null);
    const [isStarted, setStarted] = React.useState(started);

    const showSuccess = () => {
        toast.current.show({
            severity: 'success',
            summary: 'Success',
            detail: 'User deleted successfully',
            life: 3000
        });
    }

    const showSuccessUpdate = () => {
        toast.current.show({
            severity: 'success',
            summary: 'Success',
            detail: 'User updated successfully',
            life: 3000
        });
    }
    
    useEffect(() => {
        setStarted(started)

        async function FetchData() {
            // http://127.0.0.1:8000/api/users_active

            const response = await axios.get(`/users_active`);
            const data = response.data.data.map(user => {
                const employeeID = new String(user.employeeID);
                let role = user.roleID;
                if (role === 1) {
                    role = RoleTypeList[1];
                } else if (role === 2){
                    role = RoleTypeList[2];
                } else if (role === 3){
                    role = RoleTypeList[3];
                }else if (role === 4){
                    role = RoleTypeList[4];
                }else{
                    role = "Role Type not found"
                }
                
                const name = new String(user.name);
                const contactNumber = new String(user.contactNumber);
                const password = new String(user.password);
                return {...user, employeeID, role, name, contactNumber, password};
            });

            setUsers(data);
            if (data == null) {
                setUsers("-");
            }
          
        }

        FetchData();
    }, [started]);


    //Search
    const [filters, setFilters] = useState({
        global: {value: null, matchMode: FilterMatchMode.CONTAINS},
        'employeeID': {value: null, matchMode: FilterMatchMode.EQUALS},
        'name': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
        'contactNumber': {value: null, matchMode: FilterMatchMode.IN},
    });

    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = {...filters};
        _filters['global'].value = value;
        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const handleCopyClick = (password) => {
        navigator.clipboard.writeText(password)
        .then(response => {
            console.log('Copied to the clipboard',password);
        })
        .catch(error => {
            console.error('Failed to copy to the clipboard', error);
        });
    };

    const renderPasswordAndIcon = (rowData)=>{
        return(
          <>
          <div className="flex flex-row gap-4">
          <div>{rowData.password}</div>
          <i className="pi pi-copy" onClick={() => handleCopyClick(rowData.password)}></i>
          </div>
          </>
        );
      };

    

    
    const hideUserDialog = () => {
        setDeleteUserDialog(false);
    };

    const confirmDeleteUser = (user) => {
        setUser(user);
        setDeleteUserDialog(true);
    };
    
    const onRowEditComplete = (e) => {
        let _users = [...users];
        let { newData, index } = e;
        _users[index] = newData;

        handleRowEditSave(_users[index]);


        setUsers(_users);
    };

    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    };

    const roleEditor = (options) => {
        return (
            <Dropdown
                value={options.value}
                options={Object.entries(RoleList).map(([key, value]) => ({
                    label: value,
                    value: key
                }))}
                onChange={(e) => options.editorCallback(e.value)}
            />
        );
    };

    const handleDelete = (rowData) =>{
        axios.delete(`/user/${deleteUser}`, rowData)
        .then(response => {
            console.log(response);
            console.log('User deleted Successfully',response.data);
            showSuccess();
            setDeleteUserDialog(false);
        })
        .catch(error => {
            console.error(error);
        });
    }

    const handleRowEditSave = (rowData) => {
        const updatedData = rowData;
        // console.log(rowData.id);
        axios.put(`/user/${rowData.id}`, updatedData)
        .then(response => {
            
            console.log('User updated Successfully',  response.data);
            showSuccessUpdate();
            
        })
        .catch(error => {
            console.error('Error updating user.', error);
        });
    };
    
    const actionBodyTemplate = (rowData) => {
     setDeleteUser(rowData.id);
        if(rowData.roleID !== 1){
            return (
                <React.Fragment>
                    <i className="pi pi-trash text-red-600" severity="danger" onClick={()=>confirmDeleteUser(rowData)} />
                </React.Fragment>
            );
        }
    };

    const deleteUserDialogFooter = (rowData) => {
         return (
            <React.Fragment>
                <Button label="No" icon="pi pi-times" outlined onClick={hideUserDialog} />
                <Button label="Yes" icon="pi pi-check" severity="danger" onClick={handleDelete} />
            </React.Fragment>
            ); 
        };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left">
                    <i className="pi pi-search"/>
                    <InputText
                    value={globalFilterValue}
                    onChange={onGlobalFilterChange}
                    placeholder="Search"
                    className="p-field w-full"
                    />
                </span>
            </div>
        );
    };    
    
    const header = renderHeader();

    return (
        <Card>
            <Toast ref={toast} />
            <div className="card">
                <DataTable value={users}
                           paginator rows={5}
                           responsive
                           editMode="row" dataKey="id" onRowEditComplete={onRowEditComplete} 
                           filters={filters}
                           filterDisplay="row"
                           removableSort
                           tableStyle={{minWidth: "50rem"}}
                           globalFilterFields={['employeeId', 'name', 'contactNumber']}
                           header={header}
                           emptyMessage="No users found.">
                    <Column field="id" className="text-white" style={{width: '1%'}}/>        
                    <Column field="employeeID" header="Employee ID" editor={(options) => textEditor(options)} filterField="emploeeID" sortable style={{width: '10%'}}/>
                    <Column field="name" header="Name" editor={(options) => textEditor(options)} filterField="name" style={{width: '10%'}}/>
                    <Column field="contactNumber" editor={(options) => textEditor(options)} header="Contact" filterField="contactNumber"
                            style={{width: '10%'}}/>
                    <Column field="role" header="Role" editor={(options) => roleEditor(options)} style={{width: '10%'}}/>
                    <Column body={renderPasswordAndIcon} header="Password" editor={(options) => textEditor(options)} filterField="password" style={{width: '10%'}} />
                    <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} header="Actions" bodyStyle={{ textAlign: 'center' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '10%' }}></Column>
                </DataTable>
            </div>
            <Dialog visible={deleteUserDialog}  style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteUserDialogFooter} onHide={hideUserDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {user && (
                        <span>
                            Are you sure you want to delete <b>{user.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>
        </Card>
        
    );
}

export default UsersDataTable;
