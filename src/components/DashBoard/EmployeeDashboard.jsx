import React from 'react'
import Header from '../others/Header'
import TaskListNumber from '../others/TaskListNumber'
import TaskList from '../Tasklist/TaskList'

const EmployeeDashboard = (props) => {
  return (
    <div className='p-8 bg-black h-screen'>

      <Header data={props.data} changeUser={props.changeUser} HandleLogout={props.HandleLogout} />
      <TaskListNumber data={props.data} />
      <TaskList data={props.data} />
    </div>
  );
};


export default EmployeeDashboard
