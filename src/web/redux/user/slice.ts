import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
// import axios from 'axios'

interface UserState {
	loading: boolean
	error: string | null
	token: string | null
}

const initialState: UserState = {
	loading: false,
	error: null,
	token: null
}

export const signIn = createAsyncThunk(
	'user/signIn',
	async (
		paramaters: {
			email: string
			password: string
		},
		thunkAPI
	) => {
		try {
			// const { data } = await axios.post('http://123.56.149.216:8080/auth/login', {
			// 	email: paramaters.email,
			// 	password: paramaters.password
			// })
			// return data.token
		} catch (error) {
			// console.log('🚀 ~ file: slice.ts ~ line 32 ~ error', error)
		}
	}
)

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logOut: (state) => {
			state.token = null
			state.error = null
			state.loading = false
		}
	},
})
