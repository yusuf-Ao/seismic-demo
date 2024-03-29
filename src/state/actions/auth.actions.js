import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const instance = axios.create({
    baseURL: 'https://seismic-demo-api.aycodes.live/api/v1',
    headers: {

    }
})

export const authLogin = createAsyncThunk(
    'auth/login',
    async ({ formData, toast, navigate },{rejectWithValue}) => {
       try {
            localStorage.removeItem('seismic-user');
            const { data } = await instance.post('/auth/login', formData)

            console.log({data});

            const profile = await instance.get('/auth/user',{ headers: { 'Authorization': `Bearer ${data.data.bearerAccessToken}` } })

            const USER = {
                accessToken: data.data.bearerAccessToken,
                profile: profile.data.data
            }

            await localStorage.setItem('seismic-user', JSON.stringify(USER))
            toast.success('Login successful')
            navigate('/', { replace: true })

            return USER
        } catch (error) {
            console.log(error)
            if (error.response.data.reason !== null) {
                toast.error(error.response.data.reason)
                return rejectWithValue(null)
            }
            toast.error('An error occured during login')
            return rejectWithValue(null)
        }
    }
)

export const authSignup = createAsyncThunk(
    'auth/signup',
    async ({ formData, toast, navigate },{rejectWithValue}) => {
        try {
            const { data } = await instance.post('/auth/signup', formData)

            console.log({data})

            toast.success('Account created successfully.')
            navigate('/login', { replace: true })
        } catch (error) {
            if (error.response.data.reason !== null) {
                toast.error(error.response.data.message)
                return rejectWithValue(null)
            }
            toast.error('An error occured during signup')
            return rejectWithValue(null)
        }
    }
)