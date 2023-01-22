import React from "react";
import Style from './user.module.css'
import { getUser } from "../../../redux/slices/usersSlice.js";
import { useSelector } from "react-redux";



const User = (props) => {

    const user = useSelector((state => state.users.user))


    return(
        <div>
            {user.name}
        </div>
    )
}

export default User