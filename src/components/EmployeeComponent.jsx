import React, {useState, useEffect} from 'react'
import { createEmployee, updateEmployee } from '../services/EmployeeService'
import { getEmployee } from '../services/EmployeeService'
import { useNavigate, useParams} from 'react-router-dom'

export const EmployeeComponent = () => {

    const[firstName, setFirstName] = useState('')
    const[lastName, setLastName] = useState('')
    const[email, setEmail]  = useState('')
    const {id} = useParams()

    const [errors, setErrors] = useState({
        firstName:'',
        lastName: '',
        email:''
    })

    //use for navigation between different pages
    const navigator = useNavigate();

    useEffect(() => {
        if(id){
            getEmployee(id).then((response) =>{
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            }).catch(error => {
                console.error(error);
            })
        }
    }, [id])


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
    function saveOrUpdateEmployee(e){
        //prevent the page to refresh
        e.preventDefault();

        //validation check, only if true it executes
        if(validationForm()){

            console.log("Current state before save:", { firstName, lastName, email });
            //creating a new object using values from useState
            const employee = {firstName, lastName, email}
            console.log(employee)
            console.log("Employee object to send:", employee);

            //update logic and save logic
            if(id){
                console.log("Sending to backend the updated data...", employee);
                updateEmployee(id, employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees');
                }).catch(error => {
                    console.error(error);
                })
            } else {
                createEmployee(employee).then((response) => {
                    console.log(response.data); //using for debugging in console browser
                    navigator('/employees')
                }).catch(error=>{
                    console.error(error);
                })
            }
        }
    } 

    //adding function that checks the form data
    function validationForm(){
        let valid = true;

        const errorsCopy = {... errors}

        if(firstName.trim()){
            errorsCopy.firstName='';
        } else{
            errorsCopy.firstName = 'First name is required';
            valid = false;
        }

        if(lastName.trim()){
            errorsCopy.lastName='';
        }else{
            errorsCopy.lastName='Last name is required';
            valid = false;
        }
        if(email.trim()){
            errorsCopy.email='';
        }else{
            errorsCopy.email = 'Email is required'
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    //changing the title depending on the form type
    function pageTitle(){
        if(id){
            return <h2 className='text-center'>Update Employee</h2>
        }
        else{
            return <h2 className='text-center'>Add Employee</h2>
        }
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
                {
                    pageTitle()
                }
                {/* We can remove it as we added pageTitle functio: <h2 className='text-center'>Add Employee Form</h2> */}
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>First Name:</label>
                            <input
                                type='text'
                                placeholder='Enter First Name'
                                name='firstName'
                                value={firstName}
                                className={`form-control ${errors.firstName ? 'is-invalid': ''}`}
                                onChange={(e) => {
                                    console.log("Input changed:", e.target.value);
                                    setFirstName(e.target.value);
                                }}
                            />
                            {errors.firstName && <div className='invalid-feedback'> {errors.firstName} </div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Last Name:</label>
                            <input
                                type='text'
                                placeholder='Enter Last Name'
                                name='lastName'
                                value={lastName}
                                className={`form-control ${errors.lastName ? 'is-invalid': ''}`}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            {errors.lastName && <div className='invalid-feedback'> {errors.lastName} </div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Email:</label>
                            <input
                                type='text'
                                placeholder='Enter Email'
                                name='email'
                                value={email}
                                className={`form-control ${errors.email ? 'is-invalid': ''}`}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && <div className='invalid-feedback'> {errors.email} </div>}
                        </div>
                        <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}
