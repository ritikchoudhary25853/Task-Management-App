import React from 'react'
import AdminHeader from '../others/AdminHeader.jsx'
import CreateTask from '../others/CreateTask.jsx'
import AllTasks from '../others/AllTasks.jsx'


const AdminDashBoard = (props) => {
  return (
 <div id="admin-dashboard" className='min-h-screen p-8 bg-black text-white'>
    <AdminHeader changeUser={props.changeUser} HandleLogout={props.HandleLogout} />
    <CreateTask/>
    <AllTasks/>
 
 </div>

  );
};

export default AdminDashBoard
 