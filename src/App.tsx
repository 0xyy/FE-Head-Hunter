import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Auth } from './views/Auth/Auth';
import { Hr } from './views/Hr/Hr';
import { Student } from './views/Student/Student';
import { Admin } from './views/Admin/Admin';
import './App.css';

export const App = () => {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/auth" element={<Auth/>}></Route>
        <Route path="/hr" element={<Hr/>}></Route>
        <Route path="/student" element={<Student/>}></Route>
        <Route path="/admin" element={<Admin/>}></Route>
      </Routes>
    </>
  );
}