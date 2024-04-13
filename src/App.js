import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Employee from './Components/Employee';
import Advance from './Components/Advance';
import Attendance from './Components/Attendance';
import Salary from './Components/Salary';
import Dashboard from './Components/Dashboard'
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Leave from './Components/Leave';
import EditEmployee from './Components/EditEmployee';
import AddEmployee from './Components/AddEmployee';
const Appcontext = createContext();

function App() {
  const url = "https://onlinetestapi.gerasim.in/api/TeamSync/";
  const [employeelistData, setemployeelistData] = useState([]);
  const getAllEmployee = async () => {
    try {
      const result = await axios.get(`${url}GetAllEmployee`);
      setemployeelistData(result.data.data);
    } catch (error) {
      alert('Error fetching employee data');
    }
  };
 
  return (
    <>
      <Appcontext.Provider value={{ employeelistData, getAllEmployee }}>
        <BrowserRouter>
          <div className="App">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <div className="container-fluid">
                <a className="navbar-brand" href="#">TeamSync</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <NavLink className='nav-link' activeClassName='active' to="/Dashboard">Dashboard</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className='nav-link' activeClassName='active' to="/Employee">Employee</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className='nav-link' activeClassName='active' to="/Advance">Advance</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className='nav-link' activeClassName='active' to="/Attendance">Attendance</NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink className='nav-link' activeClassName='active' to="/Salary">Salary</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className='nav-link' activeClassName='active' to="/Leave">Leave</NavLink>
                    </li>
                    

                  </ul>

                </div>
              </div>
            </nav>

            <Routes>
              <Route path="/" element={<Dashboard></Dashboard>}></Route>
              <Route path="/Employee" element={<Employee></Employee>}></Route>
              <Route path="/EditEmployee/:id" element={<EditEmployee></EditEmployee>}></Route>
              <Route path="/Advance" element={<Advance></Advance>}></Route>
              <Route path='/Attendance' element={<Attendance></Attendance>}></Route>
              <Route path='/Salary' element={<Salary></Salary>}></Route>
              <Route path='/Dashboard' element={<Dashboard></Dashboard>}></Route>
              <Route path="/Leave" element={<Leave></Leave>}></Route>
              <Route path="/AddEmployee" element={<AddEmployee/>}></Route>
            </Routes>

          </div>
        </BrowserRouter>
      </Appcontext.Provider>


    </>

  );
}

export default App;
export { Appcontext }
