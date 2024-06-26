import React, { useEffect, useState,useContext } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { Appcontext } from "../App";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash,faPlus } from '@fortawesome/free-solid-svg-icons';

const Attendance = () => {
    const [attendanceList, setAttendanceList] = useState([]);
    const [employeeList, setEmployeeList] = useState([]);
    const{ employeelistData, getAllEmployee } =useContext(Appcontext);
    const[validationerror,setvalidationerror] = useState(false);
    const url = "https://onlinetestapi.gerasim.in/api/TeamSync/";
    const [attendanceObj, setAttendanceObj] = useState({
        attendanceId: 0,
        employeeId: 0,
        attendanceDate: "",
        inTime: "",
        outTime: "",
        isFullDay: false,
    });
    const getAttendanceList = async () => {
        const result = await axios.get(`${url}GetAllAttendance`);
        setAttendanceList(result.data.data);
    };
    // const getAllEmployee = async () => {
    //     const result = await axios.get(`${url}GetAllEmployee`);
    //     setEmployeeList(result.data.data);
    // };
    useEffect(() => {
        getAttendanceList();
        getAllEmployee();
    }, []);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleChange = (event, key) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setAttendanceObj((prevObj) => ({ ...prevObj, [key]: value }));
    };
    const saveAttendance = async () => {
        setvalidationerror(true);
        if(attendanceObj.employeeId !='' && attendanceObj.attendanceDate !='' && attendanceObj.inTime !='' &&
    attendanceObj.outTime!='' && attendanceList.isFullDay!=''){
        try {
            const result = await axios.post(`${url}AddAttendance`, attendanceObj);
            if (result.data.data) {
                alert(result.data.message);
                setAttendanceObj({
                    attendanceId: 0,
                    employeeId: 0,
                    attendanceDate: Date(),
                    inTime: "",
                    outTime: "",
                    isFullDay: false,
                });
                getAttendanceList();
            } else {
                alert(result.data.message);
            }
        } catch (error) {
            console.error('Error occurred while saving attendance:', error);
        }
        setShow(false);
        
    }
    else{
        alert('Something went wrong');
    }
       
    };
    const updateAttendance =async()=>{
        const result = await axios.post(`${url}UpdateAttendance`,attendanceObj);
        if(result.data.data){
            alert(result.data.message);
        }
        else{
            alert(result.data.message);
        }
        setAttendanceObj({
            attendanceId: 0,
            employeeId: 0,
            attendanceDate: Date(),
            inTime: "",
            outTime: "",
            isFullDay: false,
        });
        getAttendanceList();
        setShow(false);
    }
    const editAttendance = (attendance) => {
        const inTime = attendance.inTime.split('T')[1].split(':').slice(0, 2).join(':');
       const outTime = attendance.outTime.split('T')[1].split(':').slice(0, 2).join(':');
        const formattedDate = attendance.attendanceDate.split('T');
        const mydate = formattedDate[0];
        setAttendanceObj({
        ...attendance,
        attendanceDate: mydate,
        inTime,
        outTime,
    });
    setShow(true);
    };
    const deleteAttendance =async(attendanceId)=>{
        const result = await axios.get(`${url}DeleteAttendanceById?attendanceid=`+attendanceId);
        if(result.data.data){
            alert(result.data.message);
        }
        else{
            alert(result.data.message);

        }
        getAttendanceList();
    }
    return (
        <div>
            <div className="row mt-3">
                <div className="col-md-1"></div>
                <div className="col-md-10">
                    <div className="card">
                        <div className="card-header bg-info custom-card-header">
                            <h5>Attendance List</h5>
                            <div className="text-end">
                            <Button variant="warning" onClick={handleShow}><FontAwesomeIcon icon={faPlus} />Add New</Button>

                            </div>
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Sr.No</th>
                                        <th>Employee</th>
                                        <th>Contact No.</th>
                                        <th>Attendance Date</th>
                                        <th>In Time</th>
                                        <th>Out Time</th>
                                        <th>Is FullDay</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {attendanceList.map((attendance, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{attendance.empName}</td>
                                                <td>{attendance.empContactNo}</td>
                                                <td>{attendance.attendanceDate.split('T')[0]}</td>
                                                <td>{attendance.inTime.split('T')[1].split(':').slice(0, 2).join(':')}</td>
                                                <td>{attendance.outTime.split('T')[1].split(':').slice(0, 2).join(':')}</td>
                                                <td>{attendance.isFullDay ? 'Yes' : 'No'}</td>
                                                <td>
                                                    <button className="btn btn-sm btn-success m-2" onClick={() => editAttendance(attendance)}>
                                                    <FontAwesomeIcon icon={faEdit} />
                                                    </button>
                                                    <button className="btn btn-sm btn-danger" onClick={()=>deleteAttendance(attendance.attendanceId)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-12">
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton className="bg-info custom-card-header">
                        <Modal.Title>Attendance</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div>
                                <div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Employee</label>
                                            <select
                                                className="form-select"
                                                value={attendanceObj.employeeId}
                                                onChange={(event) => handleChange(event, "employeeId")}
                                            >
                                                <option>Select Employee</option>
                                                {employeelistData.map((employee) => {
                                                    return (
                                                        <option key={employee.empId} value={employee.empId}>
                                                            {employee.empName}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                            {
                                              validationerror && attendanceObj.employeeId ==0 && <div className="text-danger">This Field is required</div>
                                            }
                                        </div>
                                        <div className="col-md-6">
                                            <label>Date</label>
                                            <input
                                                type="Date"
                                                className="form-control"
                                                placeholder="Select Date"
                                                value={attendanceObj.attendanceDate}
                                                onChange={(event) => handleChange(event, "attendanceDate")}
                                            />
                                             {
                                               validationerror && attendanceObj.attendanceDate ==0 && <div className="text-danger">This Field is required</div>
                                            }
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>In Time</label>
                                            <input
                                                type="time"
                                                className="form-control"
                                                placeholder="Enter In Time"
                                                value={attendanceObj.inTime}
                                                onChange={(event) => handleChange(event, "inTime")}
                                            />
                                            {
                                               validationerror && attendanceObj.inTime ==0 && <div className="text-danger">This Field is required</div>
                                            }
                                        </div>
                                        <div className="col-md-6">
                                            <label>Out Time</label>
                                            <input
                                                type="time"
                                                className="form-control"
                                                placeholder="Enter Out Time"
                                                value={attendanceObj.outTime}
                                                onChange={(event) => handleChange(event, "outTime")}
                                            />
                                             {
                                               validationerror && attendanceObj.outTime ==0 && <div className="text-danger">This Field is required</div>
                                            }
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Is FullDay</label>
                                            <input
                                                type="checkbox"
                                                checked={attendanceObj.isFullDay}
                                                onChange={(event) => handleChange(event, "isFullDay")}
                                            />
                                            {
                                               validationerror && attendanceObj.isFullDay ==0 && <div className="text-danger">This Field is required</div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        {attendanceObj.attendanceId === 0 && (
                            <button className="btn btn-sm btn-primary m-2" onClick={saveAttendance}>Add</button>
                        )}
                        {attendanceObj.attendanceId !== 0 && (
                            <button className="btn btn-sm btn-primary m-2" onClick={updateAttendance}>Update</button>
                        )}
                        <button
                            className="btn btn-sm btn-danger"
                            onClick={() => setShow(false)}
                        >
                            Cancel
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default Attendance;
