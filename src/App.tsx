import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Auth } from './views/Auth/Auth';
import { Hr } from './views/Hr/Hr';
import { Student } from './views/Student/Student';
import { Admin } from './views/Admin/Admin';
import {ActivateUser} from "./views/User/ActivateUser";
import './App.css';

export const App = () => {
    return (
        <>
            <Header/>
            <Auth/>
            <Routes>
                <Route path="/activate/:userId/:activeToken" element={<ActivateUser/>}/>
                <Route path="/auth" element={<Auth/>}/>
                <Route path="/hr" element={<Hr/>}/>
                <Route path="/student" element={<Student/>}/>
                <Route path="/admin" element={<Admin/>}/>
            </Routes>
        </>
    );
};
