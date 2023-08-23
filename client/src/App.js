import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from './Screens/NotFound';
import HomeScreen from './Screens/HomeScreen';
import SingleMej from './Screens/SingleMej';
import Login from './Screens/Login';
import Register from './Screens/Register';
import Password from './Screens/Dashboard/Password';
import Dashboard from './Screens/Dashboard/Admin/Dashboard';
import AssignedMEJs from './Screens/Dashboard/AssignedMEJ';
import MejsList from './Screens/Dashboard/Admin/MejsList';
import ToastContainer from './Components/Notifications/ToastContainer';
import ProfileList from './Screens/Dashboard/Admin/ProfileList';
import Profile from './Screens/Dashboard/Profile';
import { AdminProtectedRouter, ProtectedRouter } from './ProtectedRouter';
import FileUpload from './Components/FileUpload';


function App() {



  return (
    <>
      <ToastContainer />
      <Routes>
        {/* ************ PUBLIC ROUTES ************ */}
        <Route path="/" element={<HomeScreen/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="*" element={<NotFound/>} />






        {/* ************ PRIVATE ROUTES ************ */}
        <Route element={<ProtectedRouter />} >
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/password" element={<Password/>} />

          {/* this should change */}
          <Route path="/assigned_mejs" element={<AssignedMEJs/>} /> 
          <Route path="/mejlist" element={<MejsList/>} />
          <Route path="/mej/:id" element={<SingleMej/>} />




          {/* ************ ADMIN ROUTES ************ */}
          <Route element={<AdminProtectedRouter />} >
            <Route path="/register" element={<Register/>} />
            <Route path="/profileslist" element={<ProfileList/>} />
            <Route path="/addtask" element={<FileUpload/>} />

          </Route>
        </Route>
      </Routes>
    </>
    
  );
}

export default App;
