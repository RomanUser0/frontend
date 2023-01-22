import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


export const getUsers = createAsyncThunk(
    'users/get',
    async function () {
        const token = JSON.parse(localStorage.getItem('authMe'))
        const response = await axios.get('/users', {
            headers: {
                'authorization': `Bearer ${token.token}`
            }
        })
        return await response.data
    }
)
export const getUser = createAsyncThunk(
    'users/getUser',
    async function (id) {
        const token = JSON.parse(localStorage.getItem('authMe'))
        const response = await axios.put('/user', {id}, {
            headers: {
                'authorization': `Bearer ${token.token}`
            }
        })
        return await response.data
    }
)


export const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        user: [],
        status: null,

    },
    reducers: {

    },
    extraReducers: {
        [getUsers.pending]: (state) => {
            state.status = 'pending'
        },
        [getUsers.fulfilled]: (state, action) => {
            state.status = 'fulfilled'
            state.users = action.payload
        },
        [getUser.pending]: (state) => {
            state.status = 'pending'
        },
        [getUser.fulfilled]: (state, action) => {
            state.status = 'fulfilled'
            state.user = action.payload
        }
    }
})

export default userSlice.reducer
export const {  } = userSlice.actions