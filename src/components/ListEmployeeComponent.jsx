import React, {useEffect,useState} from 'react'
import { listEmployees } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([])

    const navigator = useNavigate();

    useEffect(() => {
        listEmployees().then((response) => {
            setEmployees(response.data);
        }).catch(error => {
            console.error(error);
        })
    }, [])

    /*const dataEmployee = [
        {
            "id":1,
            "firstName" : "Elia",
            "lastName" : "Safa",
            "email" : "elia@gmail.com"
        },
        {
            "id": 2,
            "firstName" : "Mark",
            "lastName" : "Im",
            "email" : "mark@gmail.com"
        },
        {
            "id": 3,
            "firstName" : "Mari",
            "lastName" : "Lee",
            "email" : "leemaria@gmail.com"
        },
    ]
    */

    function addNewEmployee(){
        navigator('/add-employee')
    }

  return (
    <div className='container'>
        <h2 className='text-center'>List of Employeees</h2>
        <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button>

        <table className='table table-bordered'>
            <thead className ='table-dark'>
                <tr>
                    <th className='text-center text-info'>ID</th>
                    <th className='text-center text-info'>First Name</th>
                    <th className='text-center text-info'>Last Name</th>
                    <th className='text-center text-info'>Email</th>
                </tr>     
            </thead>
            <tbody>
                {
                    employees.map(employee =>
                    //dataEmployee.map(employee => 
                        <tr key = {employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListEmployeeComponent