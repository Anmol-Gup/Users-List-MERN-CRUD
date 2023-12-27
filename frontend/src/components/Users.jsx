import User from "./User";
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Users = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {

        fetch('http://localhost:3000/users')
            .then(response => response.json())
            .then(users => setUsers(users))
            .catch(err => console.log(err.message))
    }, [users])

    const removeUser=(id)=>{
        fetch(`http://localhost:3000/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id})
        })
            .then(response => response.json())
            .then(result => {console.log(result)})
            .catch(err => console.log(err.message))
    }
    return (
        <section className='container-fluid my-5'>
            <div className='d-flex justify-content-end container fs-5'>
                <Link to='/add-user' className="btn btn-dark">Add User <i className="fa-solid fa-user-plus"></i></Link>
            </div>
            <div className="container">
                <h1 className='fs-2 fw-bold text-center'>Users List</h1>
                <div className="underline"></div><br/>
                <table className="table table-hover">
                    <thead className='table-info'>
                        <tr>
                            <th scope="col">S.No.</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Age</th>
                            <th scope="col" className='text-center'>Update</th>
                            <th scope="col" className='text-center'>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((user, index) => {
                                return (
                                    <User key={index}
                                        index={index + 1}
                                        _id={user._id}
                                        name={user.name}
                                        email={user.email}
                                        gender={user.gender}
                                        age={user.age}
                                        removeUser={()=>removeUser(user._id)}
                                    />
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </section>
    )
}
export default Users