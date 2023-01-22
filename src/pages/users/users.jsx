import React from "react";
import Style from './users.module.css'
import { getUsers, getUser } from "../../redux/slices/usersSlice.js";
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from "react";
import { NavLink, useParams } from 'react-router-dom'

const Users = (props) => {

    console.log('users')

    const dispatch = useDispatch()
    const users = useSelector(state => state.users.users)

   


    
    useEffect(() => {
        dispatch(getUsers())
    }, [])

    return (
        <div>
            {users.map(u => <NavLink  key={uuidv4()} to={`/${u._id}`}> <span onClick={() => dispatch(getUser(u._id))}> {u.email} </span></NavLink>  )}
        </div> 
    )
}


export default Users