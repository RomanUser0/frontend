import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001'
})

export const auth = createAsyncThunk(
    'auth/registration',
    async function (authData) {
        const response = await instance.post('/auth', { name: authData.name, email: authData.email, password: authData.password })
        const data = await response.data;
        localStorage.setItem('authMe', JSON.stringify({ id: data._id, token: data.token }))
        return data
    }

)
export const login = createAsyncThunk(
    'auth/login',
    async function (authData) {
        const response = await instance.post('/login', { email: authData.email, password: authData.password })
        const data = await response.data;
        localStorage.setItem('authMe', JSON.stringify({ id: data._id, token: data.token }))
        return data
    }
)
export const authMe = createAsyncThunk(
    'auth/me',
    async function () {
        const dataUser = JSON.parse(localStorage.getItem('authMe'))
        const response = await instance.put('/auth/me', { userId: dataUser.id })
        const data = await response.data
        return data
    }
)
export const uploadPhoto = createAsyncThunk(
    'auth/upload',
    async function (fileData) {
        const formData = new FormData()
        formData.append('image', fileData)
        const dataUser = JSON.parse(localStorage.getItem('authMe'))
        formData.append('id', dataUser.id)
        const response = await instance.post('/static', formData)
        const data = await response.data
        return data
    }
)
export const uploadMusic = createAsyncThunk(
    'auth/music',
    async function (fileData) {
        const formData = new FormData()
        formData.append('music', fileData)
        const dataUser = JSON.parse(localStorage.getItem('authMe'))
        formData.append('id', dataUser.id)
        const response = await instance.post('/static/music', formData)
        const data = await response.data
        console.log(data)
        return data
    }
)
export const updateStatus = createAsyncThunk(
    'auth/status',
    async function (text) {
        const dataUser = JSON.parse(localStorage.getItem('authMe'))
        const response = await instance.put('/status', { text: text.status, id: dataUser.id })
        return response.data
    }
)



export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        data: null,
        status: '',
        isAuth: ''
    },
    reducers: {
        logout: (state) => {
            localStorage.clear()
            state.isAuth = false
            state.data = null
        }
    },
    extraReducers: {
        [auth.pending]: (state) => {
            state.status = 'pending'
        },
        [auth.fulfilled]: (state, action) => {
            state.status = 'fulfilled'
            state.data = action.payload
            state.isAuth = true
        },
        [login.pending]: (state) => {
            state.status = 'pending'
        },
        [login.fulfilled]: (state, action) => {
            state.status = 'fulfilled'
            state.data = action.payload
            state.isAuth = true
        },
        [authMe.pending]: (state) => {
            state.status = 'pending'
        },
        [authMe.fulfilled]: (state, action) => {
            state.status = 'fulfilled'
            state.data = action.payload
            state.isAuth = true
        },
        [uploadPhoto.pending]: (state) => {
            state.status = 'pending'
        },
        [uploadPhoto.fulfilled]: (state, action) => {
            state.status = 'fulfilled'
            state.data = action.payload
        },
        [updateStatus.pending]: (state) => {
            state.status = 'pending'
        },
        [updateStatus.fulfilled]: (state, action) => {
            state.status = 'fulfilled'
            state.data = action.payload
        },
        [uploadMusic.pending]: (state) => {
            state.status = 'pending'
        },
        [uploadMusic.fulfilled]: (state, action) => {
            state.status = 'fulfilled'
            state.data = action.payload
        },
    }
})
export const { logout } = authSlice.actions
export default authSlice.reducer