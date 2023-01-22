import React from "react";
import Style from './header.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice.js";

const Header = (props) => {

    console.log('header')

    const name = useSelector(state => state.auth.data)
    const isAuthMe = useSelector(state => state.auth.isAuth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logOut = () => {
        dispatch(logout())
        navigate('/login')
    }
    return (
        <div className={Style.header}>
            <div>
                <img className={Style.headerImg} src="https://plaqat.ru/images/14817.jpg" />
            </div>
            <div>
                {isAuthMe ?
                    <div>
                        <NavLink to='/profile'>{name.name}</NavLink>
                        <button onClick={logOut} >Выйти</button>
                    </div>
                    :
                    <div>
                        <NavLink to='/login'>Войти</NavLink>
                        <NavLink to='/auth'>Зарегестрироваться</NavLink>
                    </div>
                }
            </div>
        </div>
    )
}


export default Header