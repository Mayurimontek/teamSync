import React, { useEffect, useState,useContext  } from 'react';
import axios from 'axios'
import { Modal, Button } from 'react-bootstrap';
import{Appcontext} from '../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash,faPlus } from '@fortawesome/free-solid-svg-icons';
import '../Components/main.css';
const Leave = () => {
    const [leaveObj, setleaveObj] = useState({
        "leaveId": 0,
        "employeeId": 0,
        "leaveDate": "",
        "leaveReason": "",
        "noOfFullDayLeaves": 0,
        "noOfHalfDayLeaves": 0
    });
    const{employeelistData, getAllEmployee} =useContext(Appcontext);
    const[leaveList,setleaveList]=useState([]);
    const [show, setShow] = useState(false);
    const url = "https://onlinetestapi.gerasim.in/api/TeamSync/";
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const[validationerror,setvalidationerror] = useState(false);
    const getLeaveList = async()=>{
        debugger
        const result = await axios.get(`${url}GetAllLeaves`);
        if(result.data.data){
            setleaveList(result.data.data);
        }
        else{
            alert('Something went wrong')
        }
    }
    useEffect(()=>{
        getAllEmployee();
        getLeaveList();
    },[]);
    
    const saveLeave =async()=>{
        const result = await axios.post(`${url}AddLeave`,leaveObj);
        if(result.data.data){
            alert(result.data.message);
        }
        else{
            alert(result.data.message);
        }
        setleaveObj({
            "leaveId": 0,
            "employeeId": 0,
            "leaveDate": "",
            "leaveReason": "",
            "noOfFullDayLeaves": 0,
            "noOfHalfDayLeaves": 0
        });
        setShow(false);
        getLeaveList();
    }
    const editLeave =(leave)=>{
        const formattedDate = leave.leaveDate.split('T')[0];
        setleaveObj({
            ...leave,
            leaveDate:formattedDate
        });
        setShow(true);
    }
    const deleteleave =async(leaveId)=>{
        const result = await axios.get(`${url}DeleteLeaveById?leaveid=`+leaveId);
        if(result.data.data){
            alert(result.data.message);
        }
        else{
            alert(result.data.message);
        }
        getLeaveList();
    }
    const handleChange = (event, key) => {
        setleaveObj((prevObj) => ({ ...prevObj, [key]: event.target.value }));
    };
    const updateLeave =async()=>{
        const result = await axios.post(`${url}UpdateLeave`,leaveObj);
        if(result.data.data){
            alert(result.data.message);
        }
        else{
            alert(result.data.message);
        }
        setleaveObj({
            "leaveId": 0,
            "employeeId": 0,
            "leaveDate": "",
            "leaveReason": "",
            "noOfFullDayLeaves": 0,
            "noOfHalfDayLeaves": 0
        });
        setShow(false);
        getLeaveList();
    }
    return (
        <div>
            <div className='row mt-3'>
                <div className='col-md-1'></div>
                <div className='col-md-10'>
                    <div className='card'>
                        <div className='card-header bg-info'>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <h5>Leave List</h5>
                                    <div className='text-end'>
                                        <Button variant="warning" onClick={handleShow}><FontAwesomeIcon icon={faPlus} />Add New</Button>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className='card-body'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Sr.No</th>
                                        <th>Employee</th>
                                        <th>Leave Date</th>
                                        <th>Leave Reason</th>
                                        <th>No of full days</th>
                                        <th>No of half days</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        leaveList.map((leave, index) => {
                                            return (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{leave.empName}</td>
                                                    <td>{leave.leaveDate.split('T')[0]}</td>
                                                    <td>{leave.leaveReason}</td>
                                                    <td>{leave.noOfFullDayLeaves}</td>
                                                    <td>{leave.noOfHalfDayLeaves}</td>
                                                    <td><button className='btn btn-sm btn-success m-2' onClick={() => editLeave(leave)}>
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </button>
                                                        <button className='btn btn-sm btn-danger' onClick={() => deleteleave(leave.leaveId)}>
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </button></td>

                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

            </div>
            <div className='col-md-12'>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton className='bg-info'>
                        <Modal.Title>Leave</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div >

                            <div >
                                <div className='row'>
                                <div className="col-md-6">
                                            <label>Employee</label>
                                            <select
                                                className="form-select"
                                                value={leaveObj.employeeId}
                                                onChange={(event)=>handleChange(event,'employeeId')}
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
                                              validationerror && leaveObj.employeeId ==0 && <div className="text-danger">This Field is required</div>
                                            }
                                        </div>
                                    <div className='col-md-6'>
                                        <label>Leave Date</label>
                                        <input type="Date" value={leaveObj.leaveDate} onChange={(event) => handleChange(event, 'leaveDate')} name='leaveDate' className='form-control' />
                                        {
                                            validationerror && leaveObj.leaveDate == '' && <div className="text-danger">This Field is required</div>
                                        }
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <label>Leave Reason</label>
                                        <input type="text" value={leaveObj.leaveReason} onChange={(event) => handleChange(event, 'leaveReason')} name='leaveReason' className='form-control' placeholder='Enter Leave Reason' />
                                        {
                                            validationerror && leaveObj.leaveReason == '' && <div className="text-danger">This Field is required</div>
                                        }
                                    </div>
                                    <div className='col-md-6'>
                                        <label>No Of FullDay Leaves</label>
                                        <input type="text" value={leaveObj.noOfFullDayLeaves} onChange={(event) => handleChange(event, 'noOfFullDayLeaves')} name="noOfFullDayLeaves" className='form-control' placeholder='Enter No of full days Leaves' />
                                        {
                                            validationerror && leaveObj.noOfFullDayLeaves == '' && <div className="text-danger">This Field is required</div>
                                        }
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <label>No Of HalfDay Leaves</label>
                                        <input type="text" value={leaveObj.noOfHalfDayLeaves} onChange={(event) => handleChange(event, 'noOfHalfDayLeaves')} name="noOfHalfDayLeaves" className='form-control' placeholder='Enter no Of HalfDay Leaves' />
                                        {
                                            validationerror && leaveObj.noOfHalfDayLeaves == '' && <div className="text-danger">This Field is required</div>
                                        }
                                    </div>
                                  
                                </div>
                               
                            </div>
                            
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        {
                            leaveObj.leaveId == 0 && <button className='btn btn-sm btn-primary m-2' onClick={saveLeave}>Add</button>
                        }
                        {
                            leaveObj.leaveId != 0 && <button className='btn btn-sm btn-primary m-2' onClick={updateLeave}>Update</button>
                        }
                        <button className='btn btn-sm btn-danger' onClick={() => setShow(false)}>Cancel</button>

                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default Leave;