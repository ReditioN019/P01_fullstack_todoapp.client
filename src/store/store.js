import { configureStore } from '@reduxjs/toolkit'
import taskReducer from './features/tasks/taskSlice'
import modalsReducer from './features/modal/modalSlice'
import taskTableReducer from './features/table/tableSlice'

export const store = configureStore({
    reducer:{
        tasks: taskReducer,
        modals: modalsReducer,
        taskTable: taskTableReducer
    }
})