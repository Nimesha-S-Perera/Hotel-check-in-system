import BookingsDataTable from "./Components/BookingComponent/BookingsDataTable";
import DialogForm from "./Components/BookingComponent/Modal";
import Login from "./Components/LoginComponent/Login";
import {Routes, Route, Navigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Checkin from "./Components/BookingComponent/Checkin";
import {authRoutes, guestRoutes} from "./routes/routes";

function App() {
    const session = localStorage.getItem("user");
    return (
            <div className="App">
                <Routes>
                    {authRoutes.map((route) => (
                        <Route
                            path={route.url}
                            element={session ? <route.widget/> : <Navigate to={"/"}/>}
                        />
                    ))}
                    {guestRoutes.map((route) => (
                        <Route path={route.url} element={<route.widget/>}/>
                    ))}
                </Routes>
            </div>
    );
}

export default App;
