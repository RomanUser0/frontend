import { configureStore, combineReducers } from '@reduxjs/toolkit'
import  authSlice  from './slices/authSlice.js'
import  userSlice  from './slices/usersSlice.js'



const reducers = combineReducers({
    auth: authSlice,
    users: userSlice
})

export const store = configureStore({
    reducer: reducers,
})