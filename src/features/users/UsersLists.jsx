import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addUser, fetchUsers, getAllUsers, updateUser, userDeleted } from './UsersSlice'


export default function UsersLists() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchUsers())
  },[dispatch])
  const users = useSelector(getAllUsers)
  const handleSubmit =(e)=>{
    e.preventDefault();
    let payload = {
      name: e.target[0].value,
      email: e.target[1].value,
      phone: +e.target[2].value
    }
    dispatch(addUser({...payload}))
    dispatch(fetchUsers());
  }
  const editUser =(item)=>{
    let payload = {
    id: item.id,
    name: "hasan",
    email: "rtyuio@gmail.com",
    phone: 87534216352
    }
    dispatch(updateUser({...payload}))
  }
  const deleteUser =(id)=>{
    dispatch(userDeleted(id));
  }
  return (
    <div className="container">
      <h1>Users</h1>
      <div className="col-md-8">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.data?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>
                    <button className='btn btn-primary' onClick={()=>editUser(item)}>edit</button>
                    <button className='btn btn-danger mx-2' onClick={()=>deleteUser(item.id)}>delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="col-md-4">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" className="form-control my-2" />
          <input type="text" placeholder="Email" className="form-control my-2" />
          <input type="number" placeholder='Phone' className='form-control my-2' />
          <button type='submit' className='btn btn-success'>add</button>
        </form> 
      </div>
    </div>
  );
}
