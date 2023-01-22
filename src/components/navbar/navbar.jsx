import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Style from './navbar.module.css'



const Navbar = (props) => {

    console.log('navbar')
    const id = useSelector(state => state.auth.data._id)



    return (
        <div className={Style.navbar}>
            <ul>
                <li><NavLink to={`/profile/` + id}>Мой профиль</NavLink></li>
                <li><NavLink to='/users'>Друзья</NavLink></li>
            </ul>
        </div>
    )
}



export default Navbar