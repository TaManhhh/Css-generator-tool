import { configureStore } from '@reduxjs/toolkit'
import boxReducer from './components/BoxShadow/box.reducer'

export const store = configureStore({
    reducer: {
        blog: boxReducer,
    },
})
export type RootState = ReturnType<typeof store.getState>
export type appDispatch = typeof store.dispatch
