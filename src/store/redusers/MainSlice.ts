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
    offset: number,
    linksLength: number
}

export interface ILink {
    id: number,
    short: string,
    target: string,
    counter: number
}

interface IShortedLink {
    link: string,
    token: string | null,
    limit: number
}

interface IGetStat {
    token?: string | null,
    limit: number,
    offset: number,
    order?: string
}

const initialState: IState = {
    links: [],
    access_token: '',
    loadLinks: false,
    offset: 0,
    limit: 5,
    linksLength: 0
}

export const registerUser = createAsyncThunk(
    'main/registerUser',
    async (user: IUser) => {
        const response =  await axios.post('http://79.143.31.216/register', {},{
            params:{
                username: user.username,
                password: user.password
            }
        });
        return response.data
    }
)

export const getLengthStatistic = createAsyncThunk(
    'main/getLengthStatistic',
    async (token: string | null) => {
        const response = await axios.get('http://79.143.31.216/statistics', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    }
)

export const getStatistic = createAsyncThunk(
    'main/getStatistic',
    async (data: IGetStat) => {
        const params: IGetStat = {
            offset: data.offset,
            limit: data.limit
        }
        if (data.order)
            params['order'] = data.order

        const response = await axios.get('http://79.143.31.216/statistics', {
            headers: {
                Authorization: `Bearer ${data.token}`
            },
            params: params
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
            })
            .addCase(sendShortLink.fulfilled, (state, action) => {
                state.loadLinks = false;
                state.linksLength = state.linksLength + 1;
                if (state.links.length < action.meta.arg.limit)
                    state.links.push(action.payload);
            })
            .addCase(sendShortLink.pending, (state, action) => {
                state.loadLinks = true;
            })
            .addCase(getStatistic.fulfilled, (state, action) => {
                state.loadLinks = false;
                state.offset = action.meta.arg.offset;
                state.links = action.payload;
            })
            .addCase(getStatistic.pending, (state, action) => {
                state.loadLinks = true;
            })
            .addCase(getLengthStatistic.fulfilled, (state, action) => {
                state.linksLength = action.payload.length
            })
    }
})

export default MainSlice.reducer;