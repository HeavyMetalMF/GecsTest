import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {AppDispatch} from "../store";

export interface IUser {
    username: string,
    password: string,
}

interface IState {
    links: Array<string>,
    access_token: string
}

interface IShortedLink {
    link: string,
    token: string | null
}

const initialState: IState = {
    links: [],
    access_token: ''
}

export const registerUser = createAsyncThunk(
    'main/registerUser',
    async (user: IUser) => {
        return await axios.post('http://79.143.31.216/register', {},{
            params:{
                username: user.username,
                password: user.password
            }
        });
    }
)

export const loginUser = (user: IUser) => async (dispatch: AppDispatch) => {
    const data = new FormData();
    data.append('username', user.username);
    data.append('password', user.password);
    return await axios.post('http://79.143.31.216/login', data);
}


export const sendShortLink = createAsyncThunk(
    'main/sendShortLink',
    async (data: IShortedLink) => {
        const response = await axios.post('http://79.143.31.216/squeeze', {}, {
            headers: {
                Authorization: `Bearer ${data.token}`
            },
            params: {
                link: data.link
            }
        })
        return response.data;
    }
)

export const MainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                console.log(action)
            })
            .addCase(sendShortLink.fulfilled, (state, action) => {
                console.log(action)
            })
    }
})

export default MainSlice.reducer;