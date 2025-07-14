import React, {useState} from 'react'
import { createEmployee } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

export const EmployeeComponent = () => {

    const[firstName, setFirstName] = useState('')
    const[lastName, setLastName] = useState('')
    const[email, setEmail]  = useState('')

    const navigator = useNavigate();

    //Second Method

    // const handleFirstName = (e) => setFirstName(e.target.value);
    // const handleLastName = (e) => setLastName(e.target.value);
    // const handleEmail = (e) => setEmail(e.target.value);

    //First Method 

    // function handleFirstName(e){
    //     setFirstName(e.target.value);
    // }

    // function handleLastName(e){
    //     setLastName(e.target.value);
    // }

    // function handleEmail(e){
    //     setEmail(e.target.value);
    // }

    //function that handles the form submission
    function saveEmployee(e){
        //prevent the page to refresh
        e.preventDefault();

        //creating a new object using values from useState
        const employee = {firstName, lastName, email}
        console.log(employee)

        //sending data to backend, calls the function createEmployee in EmployeeService.js
        createEmployee(employee).then((response) => {
            console.log(response.data); //using for debugging in console browser
            navigator('/employees')
        })
    } 

   return (
    <div className='container'>
        <br/><br/><br/>
        <div className='row'>
            {/* col-md-6 means the element takes up 6 out of 12 columns — so it's 50% of the screen width, 
            and offset-md-3 means means the element is pushed 3 columns to the right,
             creating space on the left side.*/}

            <div className='card col-md-6 offset-md-3'>
                <br/>
                <h2 className='text-center'>Add Employee Form</h2>
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>First Name:</label>
                            <input
                                type='text'
                                placeholder='Enter First Name'
                                name='firstName'
                                value={firstName}
                                className='form-control'
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Last Name:</label>
                            <input
                                type='text'
                                placeholder='Enter Last Name'
                                name='lastName'
                                value={lastName}
                                className='form-control'
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Email:</label>
                            <input
                                type='text'
                                placeholder='Enter Email'
                                name='email'
                                value={email}
                                className='form-control'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button className='btn btn-success' onClick={saveEmployee}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}
