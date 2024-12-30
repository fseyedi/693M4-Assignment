import React from 'react'
import EmployeeFilter from './EmployeeFilter.jsx'
import EmployeeAdd from './EmployeeAdd.jsx'


export default class EmployeeList extends React.Component {
    constructor() {
        super()
        this.state = { employees: [] }
        this.createEmployee = this.createEmployee.bind(this)
        this.delEmployee = this.delEmployee.bind(this)
    }
    componentDidMount() {
        this.loadData()
    }
    loadData() {
        fetch('/api/employees')
        .then(response => response.json())
        .then(data =>  {
            console.log('Total number of emp :', data.count)
            data.employees.forEach(employee => {
                employee.dateHired = new Date(employee.dateHired)

            })
            this.setState({employees : data.employees})
        })
        .catch(err => (console.log(err)))
    }
    createEmployee(employee) {
        fetch('/api/employees',{
            method :'POST',
            headers :{'Content-Type' : 'application/json'},
            body: JSON.stringify(employee)
        })
        .then(response => response.json())
        .then(newEmployee =>  {

            newEmployee.employee.dateHired = new Date(newEmployee.employee.dateHired)
            const newEmployees = this.state.employees.concat(newEmployee.employee)
            this.setState({ employees: newEmployees })
            console.log('Total emp insert is :',newEmployees.length)
        })
        .catch(err => (console.log(err)))
        
    }

    delEmployee(id) {
        fetch(`/api/employees/${id}`, {method : 'DELETE' })
        .then(response => {
            if (!response.ok){
                console.log('failed to delete emp')
            } else
            {
                this.loadData()
            }
        })
        .catch(err => console.log(err));
    }

    render() {
        return (
            <React.Fragment>
                <h1>Employee Management Application</h1>
                <EmployeeFilter />
                <hr />
                <EmployeeTable employees={this.state.employees} delEmployee={this.delEmployee} />
                <hr /> 
                <EmployeeAdd createEmployee={this.createEmployee}  />
            </React.Fragment>
        )
    }
}

function EmployeeTable(props) {
    const employeeRows = props.employees.map(employee => 
    <EmployeeRow key={employee._id} 
    employee={employee} 
    delEmployee={props.delEmployee}
        />)
    return (
        <table className="bordered-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Extension</th>
                    <th>Email</th>
                    <th>Title</th>
                    <th>Date Hired</th>
                    <th>Currently Employed?</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {employeeRows}
            </tbody>
        </table>
    )
}

function EmployeeRow(props) {
    function onDelClick(){
        props.delEmployee(props.employee._id)
    }
    return (
        <tr>
            <td>{props.employee.name}</td>
            <td>{props.employee.extension}</td>
            <td>{props.employee.email}</td>
            <td>{props.employee.title}</td>
            <td>{props.employee.dateHired.toDateString()}</td>
            <td>{props.employee.currentlyEmployed ? 'Yes' : 'No'}</td>
            <td><button onClick={onDelClick}>Del</button></td>
        </tr>
    )
}


