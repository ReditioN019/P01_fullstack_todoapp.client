import { configureStore } from '@reduxjs/toolkit'
import taskReducer from './features/tasks/taskSlice'
import actionsReducer from './features/actions/actionSlice'

export const store = configureStore({
    reducer:{
        tasks: taskReducer,
        actions: actionsReducer
    }
})