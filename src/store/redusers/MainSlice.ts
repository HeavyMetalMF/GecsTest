import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {AppDispatch} from "../store";

export interface IUser {
    username: string,
    password: string,
}

interface IState {
    links: Array<ILink>,
    access_token: string,
    loadLinks: boolean,
    limit: number,
    offset: number
}

export interface ILink {
    id: number,
    short: string,
    target: string,
    counter: number
}

interface IShortedLink {
    link: string,
    token: string | null
}

interface IGetStat {
    token: string | null,
    limit: number,
    offset: number
}

const initialState: IState = {
    links: [],
    access_token: '',
    loadLinks: false,
    offset: 0,
    limit: 5
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

export const getStatistic = createAsyncThunk(
    'main/getStatistic',
    async (data: IGetStat) => {
        const response = await axios.get('http://79.143.31.216/statistics', {
            headers: {
                Authorization: `Bearer ${data.token}`
            },
            params: {
                offset: data.offset,
                limit: data.limit
            }
        })
        return response.data
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
                link: data.link,
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
                console.log(action);
            })
            .addCase(sendShortLink.fulfilled, (state, action) => {
                console.log(action);
            })
            .addCase(getStatistic.fulfilled, (state, action) => {
                state.loadLinks = false;
                state.offset = action.meta.arg.offset;
                state.links = action.payload;
            })
            .addCase(getStatistic.pending, (state, action) => {
                state.loadLinks = true;
            })
    }
})

export default MainSlice.reducer;