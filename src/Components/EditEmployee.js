import {React,useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import { post, put, get, deletedata } from '../ApiService';
import axios from 'axios';
import{useNavigate} from 'react-router-dom';
const EditEmployee = () => {
    let{id} = useParams();
    const [validationerror, setvalidationerror] = useState(false);

    const [employeeObj, setemployeeObj] = useState({
        empId: 0,
        empName: "",
        empContactNo: "",
        empAltContactNo: "",
        empEmail: "",
        addressLine1: "",
        addressLine2: "",
        pincode: "",
        city: "",
        state: "",
        bankName: "",
        ifsc: "",
        accountNo: "",
        bankBranch: "",
        salary: 0
    });
    const handleChnage = (event, key) => {
        setemployeeObj((prevObj) => ({ ...prevObj, [key]: event.target.value }));
    }
    
const navigate = useNavigate();

    const clearempObj = () => {
        setemployeeObj({
            empId: 0,
            empName: "",
            empContactNo: "",
            empAltContactNo: "",
            empEmail: "",
            addressLine1: "",
            addressLine2: "",
            pincode: "",
            city: "",
            state: "",
            bankName: "",
            ifsc: "",
            accountNo: "",
            bankBranch: "",
            salary: 0
        });
    }
    const validateForm = () => {
        return (
            employeeObj.empName !== '' &&
            employeeObj.empContactNo !== '' &&
            employeeObj.empAltContactNo !== '' &&
            employeeObj.empEmail !== '' &&
            employeeObj.addressLine1 !== '' &&
            employeeObj.addressLine2 !== '' &&
            employeeObj.pincode !== '' &&
            employeeObj.city !== '' &&
            employeeObj.state !== '' &&
            employeeObj.bankName !== '' &&
            employeeObj.ifsc !== '' &&
            employeeObj.accountNo !== '' &&
            employeeObj.bankBranch !== '' &&
            employeeObj.salary !== ''
        );
    };
   
    const updateEmployee = async () => {
        if(validateForm){
            put(employeeObj, 'UpdateEmployee').then(result => {
                if (result != undefined) {
                    alert(result.message);
                }
                else {
                    alert('Something went wrong');
                }
                clearempObj();
                navigate(`/Employee`);
            })
           
        }
        else{
            alert('All fields are required');
        }
    }
    const getEmployeeById =async(id)=>{
        const result = await axios.get('https://onlinetestapi.gerasim.in/api/TeamSync/GetEmployeeByEmpId?empid='+id);
        if(result!=undefined){
            setemployeeObj(result.data.data);
        }
        else{
            alert(result.data.message);
        }
    }
    const handleCancle =()=>{
        navigate('/Employee');
    }
    useEffect(()=>{
        getEmployeeById(id);
    },[]);
    return (
        <>
        <div className='row mt-3'>
        <div className='col-md-3'></div>
         <div className='col-md-6'>
                            <div className='card' >
                                <div className='card-header'>
                                Employee
                                </div>
                                <div className='card-body'>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <label>Name</label>
                                        <input type="text" className='form-control' value={employeeObj.empName} placeholder='Enter Name' onChange={(event) => handleChnage(event, 'empName')} />
                                        {
                                            validationerror && employeeObj.empName == '' && <div className="text-danger">This Field is required</div>
                                        }
                                    </div>
                                    <div className='col-md-6'>
                                        <label>Contact No.</label>
                                        <input type="text" value={employeeObj.empContactNo} onChange={(event) => handleChnage(event, 'empContactNo')} name='empContactNo' className='form-control' placeholder='Enter Contact Number' />
                                        {
                                            validationerror && employeeObj.empContactNo == '' && <div className="text-danger">This Field is required</div>
                                        }
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <label>Alternate Contact No</label>
                                        <input type="text" value={employeeObj.empAltContactNo} onChange={(event) => handleChnage(event, 'empAltContactNo')} name='empAltContactNo' className='form-control' placeholder='Enter Alternate Contact No.' />
                                        {
                                            validationerror && employeeObj.empAltContactNo == '' && <div className="text-danger">This Field is required</div>
                                        }
                                    </div>
                                    <div className='col-md-6'>
                                        <label>Email</label>
                                        <input type="text" value={employeeObj.empEmail} onChange={(event) => handleChnage(event, 'empEmail')} name="empEmail" className='form-control' placeholder='Enter Email' />
                                        {
                                            validationerror && employeeObj.empEmail == '' && <div className="text-danger">This Field is required</div>
                                        }
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <label>Address 1</label>
                                        <input type="text" value={employeeObj.addressLine1} onChange={(event) => handleChnage(event, 'addressLine1')} name="addressLine1" className='form-control' placeholder='Enter Address 1' />
                                        {
                                            validationerror && employeeObj.addressLine1 == '' && <div className="text-danger">This Field is required</div>
                                        }
                                    </div>
                                    <div className='col-md-6'>
                                        <label>Address 2</label>
                                        <input type="text" value={employeeObj.addressLine2} onChange={(event) => handleChnage(event, 'addressLine2')} name="addressLine2" className='form-control' placeholder='Enter Address 2' />
                                        {
                                            validationerror && employeeObj.addressLine2 == '' && <div className="text-danger">This Field is required</div>
                                        }
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <label>Pin Code</label>
                                        <input type="text" value={employeeObj.pincode} onChange={(event) => handleChnage(event, 'pincode')} name="pincode" className='form-control' placeholder='Enter Pin Code' />
                                        {
                                            validationerror && employeeObj.pincode == '' && <div className="text-danger">This Field is required</div>
                                        }
                                    </div>
                                    <div className='col-md-6'>
                                        <label>City</label>
                                        <input type="text" value={employeeObj.city} onChange={(event) => handleChnage(event, 'city')} name="city" className='form-control' placeholder='Enter City' />
                                        {
                                            validationerror && employeeObj.city == '' && <div className="text-danger">This Field is required</div>
                                        }
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <label>State</label>
                                        <input type="text" value={employeeObj.state} onChange={(event) => handleChnage(event, 'state')} name="state" className='form-control' placeholder='Enter State' />
                                        {
                                            validationerror && employeeObj.state == '' && <div className="text-danger">This Field is required</div>
                                        }
                                    </div>
                                    <div className='col-md-6'>
                                        <label>Bank Name</label>
                                        <input type="text" value={employeeObj.bankName} onChange={(event) => handleChnage(event, 'bankName')} name='bankName' className='form-control' placeholder='Enter Bank Name' />
                                        {
                                            validationerror && employeeObj.bankName == '' && <div className="text-danger">This Field is required</div>
                                        }
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <label>IFSC Code</label>
                                        <input type="text" value={employeeObj.ifsc} onChange={(event) => handleChnage(event, 'ifsc')} name="ifsc" className='form-control' placeholder='Enter IFSC Code' />
                                        {
                                            validationerror && employeeObj.ifsc == '' && <div className="text-danger">This Field is required</div>
                                        }
                                    </div>
                                    <div className='col-md-6'>
                                        <label>Account Number</label>
                                        <input type="text" value={employeeObj.accountNo} onChange={(event) => handleChnage(event, 'accountNo')} name="accountNo" className='form-control' placeholder='Enter Account Number' />
                                        {
                                            validationerror && employeeObj.accountNo == '' && <div className="text-danger">This Field is required</div>
                                        }
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <label>Bank Branch</label>
                                        <input type="text" value={employeeObj.bankBranch} onChange={(event) => handleChnage(event, 'bankBranch')} className='form-control' placeholder='Enter Bank Branch' />
                                    </div>
                                    <div className='col-md-6'>
                                        <label>Salary</label>
                                        <input type="text" value={employeeObj.salary} onChange={(event) => handleChnage(event, 'salary')} name="salary" className='form-control' placeholder='Enter Salary' />
                                    </div>
                                </div>
                                </div>
                               <div className='card-footer'>
                            
                        {
                            employeeObj.empId != 0 && <button className='btn btn-sm btn-primary m-2' onClick={updateEmployee}>Update</button>
                        }
                        <button className='btn btn-sm btn-danger' onClick={handleCancle} >Cancel</button>

                               </div>
                            </div>
                          
                        </div>
        </div>
        
        </>
       
    );
};

export default EditEmployee;