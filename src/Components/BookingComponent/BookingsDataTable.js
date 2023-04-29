import React, {useState, useEffect} from "react";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {InputText} from "primereact/inputtext";
import {FilterMatchMode} from 'primereact/api';
import {Card} from 'primereact/card';
import axios from '../../Axios/AxiosInstance';
import 'primeicons/primeicons.css';
import {RoomTypeList} from "../../Utilities/BookingUtilities/RoomTypeList";
import {RoomStatusList} from "../../Utilities/RoomStatusList";
import {StayTypeList} from "../../Utilities/BookingUtilities/StayTypeList";
import {PermissionList} from "../../Utilities/PermissionUtilities/PermissionList";
import {Tag} from 'primereact/tag';
import {Payments} from "../../Utilities/BookingUtilities/Payments";
import {useNavigate} from "react-router-dom";
import {Permissions} from "../../Auth/Permissions";

function BookingsDataTable({started}) {
    const [bookings, setBookings] = useState([]);
    const [isStarted, setStarted] = React.useState(started);
    const [accAccess, setAccAccess] = useState(0);

    const storedUser = JSON.parse(localStorage.getItem('user'));
    const name = storedUser.name;
    const roleType = storedUser.roleType;
    const roleID = storedUser.roleID;
    const naviagate = useNavigate();
    console.log('roleID', roleID);

    const accessToBookingList = PermissionList.roomsPermission;

    //To check if the login user have the permission to do the action
    async function fetchPermissions() {
        const operationID = accessToBookingList;
        const permissions = await Permissions(roleID, operationID);
        setAccAccess(permissions.access);
        console.log(permissions);
    }

    useEffect(() => {
        setStarted(started)
        fetchPermissions()
        //if the user have access
        if (accAccess == 1) {
            async function FetchData() {
                const sesssion = JSON.parse(localStorage.getItem('user'))
                const config = {
                    headers:{
                        Authorization:`Bearer ${sesssion.roleID}`
                    }
                }

                const response = await axios.get(`/bookings?current_guest_only=true`, {},config);
                console.log(response);
                const data = response.data.data.map(booking => {
                    const checkInDate = new Date(booking.checkInDate);
                    const checkOutDate = new Date(booking.checkOutDate != null ? booking.checkOutDate : "1/01/1970");
                    let roomType = booking.roomType;
                    if (roomType == 0) {
                        roomType = RoomTypeList[0];
                    } else if (roomType == 1) {
                        roomType = RoomTypeList[1];
                    } else {
                        roomType = "Room suite not found"
                    }
                    let roomStatus = booking.status;
                    if (roomStatus == 0) {
                        roomStatus = RoomStatusList[0];
                    } else if (roomStatus == 1) {
                        roomStatus = RoomStatusList[1];
                    } else {
                        roomType = "Room status not found"
                    }
                    let guestStayType = booking.stayType;
                    if (guestStayType == 0) {
                        guestStayType = StayTypeList[0];
                    } else if (guestStayType == 1) {
                        guestStayType = StayTypeList[1];
                    }
                    const stayPeriod = booking.guest ?
                        `${checkInDate.getDate().toString().padStart(2, '0')}/${(checkOutDate.getMonth() + 1).toString().padStart(2, '0')}/${checkInDate.getFullYear()}  - ${checkOutDate.getDate().toString().padStart(2, '0')}/${(checkOutDate.getMonth() + 1).toString().padStart(2, '0')}/${checkInDate.getFullYear()} ` :
                        '-';
                    guestStayType = booking.guest ? guestStayType : '-';
                    const guestName = booking.guest ? booking.guest.name : '-';
                    const guestNic = booking.guest ? booking.guest.nic : '-';
                    const guestContactNumber = booking.guest ? booking.guest.contactNumber : '-';
                    return {
                        ...booking,
                        stayPeriod,
                        guestName,
                        guestNic,
                        guestContactNumber,
                        roomType,
                        roomStatus,
                        guestStayType
                    };
                });

                setBookings(data);
                if (data == null) {
                    setBookings("-");
                }
                console.log(data);
            }

            FetchData();
        } else {
            console.log('Permission Denied');
            //naviagate("/403");
        }

    }, [started, accAccess]);

    const statusBodyTemplate = (bookings) => {
        return <Tag value={bookings.roomStatus} severity={getSeverity(bookings)}></Tag>;
    };

    const getSeverity = (bookings) => {
        switch (bookings.roomStatus) {
            case 'Available':
                return 'success';
            case 'Booked':
                return 'danger';
            default:
                return null;
        }
    };

    //Search
    const [filters, setFilters] = useState({
        global: {value: null, matchMode: FilterMatchMode.CONTAINS},
        'guest.nic': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
        'guest.name': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
        'guest.contactNumber': {value: null, matchMode: FilterMatchMode.IN},
        roomNo: {value: null, matchMode: FilterMatchMode.EQUALS},
    });

    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = {...filters};
        _filters['global'].value = value;
        setFilters(_filters);
        setGlobalFilterValue(value);
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
            <div className="card">
                <DataTable value={bookings}
                           paginator rows={5}
                           responsive
                           filters={filters}
                           filterDisplay="row"
                           removableSort
                           tableStyle={{minWidth: "50rem"}}
                           globalFilterFields={['guest.nic', 'guest.name', 'guest.contactNumber', 'roomNo']}
                           header={header}
                           emptyMessage="No bookings found.">
                    <Column field="roomNo" header="Room ID" filterField="roomNo" sortable style={{width: '12%'}}/>
                    <Column field="roomStatus" body={statusBodyTemplate} header="Status" sortable
                            style={{width: '12%'}}/>
                    <Column field="roomType" header="Room Suite" sortable style={{width: '12%'}}/>
                    <Column field="guestName" header="Guest" filterField="guest.name" style={{width: '14%'}}/>
                    <Column field="stayPeriod" header="Staying Period" style={{width: '14%'}}/>
                    <Column field="guestStayType" header="Stay Type" sortable style={{width: '12%'}}/>
                    <Column field="guestContactNumber" header="Contact" filterField="guest.contactNumber"
                            style={{width: '12%'}}/>
                    <Column field="guestNic" header="NIC" filterField="guest.nic" style={{width: '12%'}}/>
                </DataTable>
            </div>
        </Card>
    );
}

export default BookingsDataTable;
