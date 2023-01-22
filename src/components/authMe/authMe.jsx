import React from "react";
import Style from './authMe.module.css'
import { useForm } from 'react-hook-form'
import { login } from "../../redux/slices/authSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthMe = (props) => {

    console.log('authMe')

   const { register, formState: {errors}, handleSubmit } = useForm()
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const onSubmit = (data) => {
        dispatch(login({name: data.name, email: data.email, password: data.password}))
        navigate('/users')
   }



    return(
        <form className={Style.authForm} onSubmit={handleSubmit(onSubmit)}>
            <input {...register('email')} type='email'/>
            <input {...register('password')} type='password'/>
            <button>Enter</button>
        </form>
    )
}

export default AuthMe