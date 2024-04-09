import React, { useEffect, useState,useContext } from 'react';
import axios from 'axios'
import { Modal, Button } from 'react-bootstrap';
import{Appcontext} from '../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash,faPlus} from '@fortawesome/free-solid-svg-icons';

const Salary = () => {
    const[salaryObj,setsalaryObj]=useState({
        "salaryId": 0,
        "employeeId": 0,
        "salaryDate": new Date(),
        "totalAdvance": '',
        "presentDays": '',
        "salaryAmount": '',
    });
    const { employeelistData, getAllEmployee } = useContext(Appcontext);
    const [show, setShow] = useState(false);
    const url = "https://onlinetestapi.gerasim.in/api/TeamSync/";
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const[validationerror,setvalidationerror] = useState(false);
    const[salaryList,setsalaryList]=useState([]);
    const getSalaryList = async()=>{
        debugger
        const result = await axios.get(`${url}GetAllSalary`);
        if(result.data.data){
            setsalaryList(result.data.data);
        }
        else{
            alert('Something went wrong')
        }
    }
    const saveSalary =async()=>{
        debugger
        setvalidationerror(true);
        if(salaryObj.employeeId!='' && salaryObj.salaryDate!='' && salaryObj.totalAdvance!='' && salaryObj.presentDays!='' && salaryObj.salaryAmount!=''){
            debugger
            const result = await axios.post(`${url}AddSalary`,salaryObj);
            if(result.data.data){
                alert(result.data.message);
            }
            else{
                alert(result.data.message);
            }
            setsalaryObj({
                "salaryId": 0,
                "employeeId": 0,
                "salaryDate": '',
                "totalAdvance": '',
                "presentDays": '',
                "salaryAmount": '',
            });
            getSalaryList();
            setShow(false);
            setvalidationerror(false);
        }
        else{
            alert('Something went wrong');
        }
        
    }
    const updateSalary =async()=>{
        const result = await axios.post(`${url}UpdateSalary`,salaryObj);
        if(result.data.data){
            alert(result.data.message);
        }
        else{
            alert(result.data.message);
        }
        setsalaryObj({
            "salaryId": 0,
            "employeeId": 0,
            "salaryDate": '',
            "totalAdvance": '',
            "presentDays": '',
            "salaryAmount": '',
        });
        getSalaryList();
        setShow(false);
    }
    useEffect(()=>{
        getAllEmployee();
        getSalaryList();
    });
    const handleChange = (event, key) => {
        setsalaryObj((prevObj) => ({ ...prevObj, [key]: event.target.value }));
    };
    const editSalary =(salary)=>{
        const myDate = salary.salaryDate.split('T')[0];
        setShow(true);
        setsalaryObj({
            ...salary,
            salaryDate:myDate
        }
           
        );
    }
    const deleteSalary=async(salaryId)=>{
        debugger
        const result = await axios.get(`${url}DeleteSalaryById?salaryId=`+salaryId);
        if(result.data.data){
            alert(result.data.message);
        }
        else{
            alert(result.data.message);
        }
        setsalaryObj(salaryObj.salaryId == 0);
        getSalaryList();
    }
    return (
        <div>
            <div className='row mt-3'>
                <div className='col-md-1'></div>
                <div className='col-md-9'>
                    <div className='card'>
                        <div className='card-header bg-info'>
                            <h5>Salary List</h5>
                            <div className='text-end'>
                            <Button variant="warning" onClick={handleShow}><FontAwesomeIcon icon={faPlus} />Add New</Button>

                                </div>
                        </div>
                        <div className='card-body'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Sr.No</th>
                                        <th>Employee</th>
                                        <th>Salary Date</th>
                                        <th>Total Advance</th>
                                        <th>Present Days</th>
                                        <th>Salary Amount</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                        salaryList.map((salary, index) => {
                                            return (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{salary.empName}</td>
                                                    <td>{salary.salaryDate.split('T')[0]}</td>
                                                    <td>{salary.totalAdvance}</td>
                                                    <td>{salary.presentDays}</td>
                                                    <td>{salary.salaryAmount}</td>
                                                    <td><button className='btn btn-sm btn-success m-2' onClick={() => editSalary(salary)}>
                                                    <FontAwesomeIcon icon={faEdit} />
                                                    </button>
                                                        <button className='btn btn-sm btn-danger' onClick={() => deleteSalary(salary.salaryId)}>
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
                        <Modal.Title>Salary</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div >
                          
                        <div >
                            <div className='row'>
                                <div className='col-md-6'>
                                    <label>Employee</label>
                                    <select
                                                className="form-select"
                                                value={salaryObj.employeeId}
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
                                                    validationerror && salaryObj.employeeId ==0 && <div className='text-danger'>
                                                        This field is required
                                                    </div>
                                                }
                                </div>
                                <div className='col-md-6'>
                                    <label>Salary  Date</label>
                                    <input type="Date" className='form-control' value={salaryObj.salaryDate} onChange={(event) => handleChange(event, "salaryDate")}  />
                                    {
                                                    validationerror && salaryObj.salaryDate =='' && <div className='text-danger'>
                                                        This field is required
                                                    </div>
                                                }
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <label>Total Advance</label>
                                    <input type="text"  className='form-control' value={salaryObj.totalAdvance} placeholder='Enter Total Advance' onChange={(event) => handleChange(event, "totalAdvance")}/>
                                    {
                                                    validationerror && salaryObj.totalAdvance =='' && <div className='text-danger'>
                                                        This field is required
                                                    </div>
                                                }
                                </div>
                                <div className='col-md-6'>
                                    <label>Present Days</label>
                                    <input type="text"   className='form-control' value={salaryObj.presentDays} placeholder='Enter Present Days' onChange={(event) => handleChange(event, "presentDays")} />
                                    {
                                                    validationerror && salaryObj.presentDays =='' && <div className='text-danger'>
                                                        This field is required
                                                    </div>
                                                }
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <label>Salary Amount</label>
                                    <input type="text"  className='form-control' value={salaryObj.salaryAmount} placeholder='Enter Salary Amount'onChange={(event) => handleChange(event, "salaryAmount")} />
                                    {
                                                    validationerror && salaryObj.salaryAmount =='' && <div className='text-danger'>
                                                        This field is required
                                                    </div>
                                                }
                                </div>
                                
                            </div>
                          
                        </div>
                       
                    </div>
                               
                          
                    </Modal.Body>
                    <Modal.Footer>
                        {
                            salaryObj.salaryId == 0 && <button className='btn btn-sm btn-primary m-2' onClick={saveSalary} >Add</button>
                        }
                        {
                            salaryObj.salaryId != 0 && <button className='btn btn-sm btn-primary m-2' onClick={updateSalary} >Update</button>
                        }
                        <button className='btn btn-sm btn-danger' onClick={() => setShow(false)}>Cancel</button>

                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default Salary;