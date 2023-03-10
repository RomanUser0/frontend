import React from "react";
import Style from './profile.module.css'
import { useDispatch, useSelector } from "react-redux";
import { uploadPhoto, updateStatus, uploadMusic } from "../../redux/slices/authSlice.js";
import { useState } from "react";
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid';
import { NavLink, useParams } from 'react-router-dom'




const Profile = (props) => {

    console.log('profile')
    const { id } = useParams()
    const staticPhoto = "https://www.fullhdfilmizle1080p.com/wp-content/uploads/2019/04/avatar-2-sansursuz-izle.jpg"
    const user = useSelector((state) => state.auth.data)
    const [status, setStatus] = useState(true)
    const dispatch = useDispatch()
    const { register, formState: { errors }, handleSubmit } = useForm({

    })



    const uploadFile = (file) => {
        dispatch(uploadPhoto(file.target.files[0]))
    }
    const uploadMusicf = (music) => {
        dispatch(uploadMusic(music.target.files[0]))
    }
    const onSubmit = (text) => {
        dispatch(updateStatus(text))
        setStatus(false)
    }
    const photos = user.photos.map(photo => <img key={uuidv4()} src={'https://server-roman.onrender.com/' + photo} />)


    return (
        <div className={Style.profile}>
            <div className={Style.name}>{user.name}</div>
            <div><img className={Style.photoProfile} src={user.avatar ? 'https://server-roman.onrender.com/' + user.avatar : staticPhoto} /></div>
            <label>
                Загрузить изображение
                <input className={Style.uploadPhoto} onChange={(file) => uploadFile(file)} type='file'></input>
            </label>
            <div>
                {status ?
                    <span onClick={() => setStatus(false)} className={Style.status}>{user.status ? user.status : 'Классный фильм!!!'}</span>
                    :
                    <form onBlur={handleSubmit(onSubmit)} >
                        <input {...register('status')} className={Style.updateStatus} autoFocus type='text' />
                    </form>
                }
            </div>
            <div className={Style.photos}>
                {photos}
            </div>
            <div>
                <input type='file' onChange={(mus) => uploadMusicf(mus)}></input>
            </div>
            <div className={Style.video}><video controls src={ 'https://server-roman.onrender.com/' + user.music}>dsds</video>  </div>
        </div>
    )
}

export default Profile