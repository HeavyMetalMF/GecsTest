import {combineReducers, configureStore} from "@reduxjs/toolkit";
import MainSlice from "./redusers/MainSlice";

const rootReducer = combineReducers({
    MainSlice,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']