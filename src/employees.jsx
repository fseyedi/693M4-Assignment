import React from 'react'
import ReactDOM from 'react-dom'
import {createRoot} from 'react-dom/client'
import EmployeeList from './EmployeeList.jsx'



ReactDOM.render(
    <React.StrictMode>
        <EmployeeList />
    </React.StrictMode>, 
    document.getElementById('content')
)