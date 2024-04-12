import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'
import { Field, Form, Formik } from 'formik';
import { Modal, Button } from 'react-bootstrap';
import { Appcontext } from '../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { post, put, get, deletedata } from '../ApiService';
import DynamicTable from '../DynamicTable';
import { AgGridReact } from 'ag-grid-react';
import{useNavigate} from 'react-router-dom';


const Employee = ({ children }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
    };
    const [validationerror, setvalidationerror] = useState(false);
    const url = "https://onlinetestapi.gerasim.in/api/TeamSync/"
    const headers = ['Id', 'Name', 'Contact No', 'Email', 'City', 'Salary'];
    const pagination = true;
    const paginationPageSize = 10;
    const paginationPageSizeSelector = [10, 20, 30];
    const[employeelistData,setemployeelistData]=useState([]);
    const navigate = useNavigate();
    const filteredData = employeelistData.map(employee => {
        return {
            'Id': employee.empId,
            'Name': employee.empName,
            'Contact No': employee.empContactNo,
            'Email': employee.empEmail,
            'City': employee.city,
            'Salary': employee.salary
        }

    });
    const getAllEmployee = async () => {
        debugger
        try {
          const result = await axios.get(`${url}GetAllEmployee`);
          setemployeelistData(result.data.data);
          console.log(employeelistData);
        } catch (error) {
          alert('Error fetching employee data');
        }
      };
    useEffect(() => {
        getAllEmployee();
        console.log(employeelistData);
    }, []);
    
    const editEmp = (emp) => {
    navigate(`/EditEmployee/${emp.Id}`);
    };
    const CustomButtonComponent = (props) => {
        return (
            <React.Fragment>
                <button className='btn btn-sm btn-success' onClick={() => editEmp(props.data)}>Edit</button>
                <button className='btn btn-sm btn-danger' onClick={() => deleteEmp(props.data)}>Delete</button>
            </React.Fragment>
        );
    };
    
    
    const [colDefs, setColDefs] = useState([
        { field: "Name", editable: true },
        { field: "Contact No" },
        { field: "Email" },
        { field: "City" },
        { field: "Salary" },
        { field: "Action", cellRenderer: CustomButtonComponent }
    ]);
    
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

  
    const deleteEmp = async (employee) => {
        debugger
        deletedata(employee.Id, 'DeleteEmployeeByEmpId?empid=').then(result => {
            if (result != undefined) {
                alert(result.message);
            }
            else {
                alert('Something went wrong');
            }
            setShow(false);
            getAllEmployee();
        })

    }

    return (
        <div className='container-fluid'>
            <div className='row mt-3'>
                <div className='col-md-12'>
                    <div className='card'>
                        <div className='card-header bg-secondary'>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <div>
                                        <h5>Employee List</h5>
                                    </div>
                                    <div className='text-end'>
                                        <Button variant="warning" onClick={handleShow}><FontAwesomeIcon icon={faPlus} />Add New</Button>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="ag-theme-quartz" style={{ height: 550 }}>
                            <AgGridReact
                                rowData={filteredData}
                                columnDefs={colDefs}
                                pagination={pagination}
                                paginationPageSize={paginationPageSize}
                                paginationPageSizeSelector={paginationPageSizeSelector}
                            />
                        </div>
                    </div>
                </div>

            </div>
          

        </div>
    );
};

export default Employee;