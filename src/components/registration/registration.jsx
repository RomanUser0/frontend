import React from "react";
import Style from './registration.module.css'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { auth } from "../../redux/slices/authSlice.js";
import { useNavigate } from "react-router-dom";

const Registration = (props) => {

    console.log('registration')

    const dispatch = useDispatch()
    const { register, formState: { errors }, handleSubmit } = useForm()
    const navigate = useNavigate()

    const onSubmit = (data) => {
        dispatch(auth({name: data.name, email: data.email, password: data.password}))
        navigate('/profile')
    }



    return (
        <form className={Style.registrForm} onSubmit={handleSubmit(onSubmit)}>
            <input {...register('name')} type='text' />
            <input {...register('email')} type='email' />
            <input {...register('password')} type='password' />
            <button>Enter</button>
        </form>
    )
}

export default Registration