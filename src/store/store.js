import { configureStore } from '@reduxjs/toolkit'
import taskReducer from './features/tasks/taskSlice'
import actionsReducer from './features/actions/actionSlice'
import taskTableReducer from './features/table/tableSlice'

export const store = configureStore({
    reducer:{
        tasks: taskReducer,
        actions: actionsReducer,
        taskTable: taskTableReducer
    }
})