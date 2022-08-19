import { createSlice } from '@reduxjs/toolkit'

export const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: []
    }, //initialState: initialState
    reducers:{
        getTasks: (state, action) => {
            state.tasks = action.payload.tasks; 
        },
        addTask: (state, action) => { 
        
        },
        updateTask: (state, action) => {

            state.tasks = state.tasks.filter( task => task.id !== action.payload)
            getTasks()
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter( task => task.id !== action.payload )
        }   
    }
})

export const { getTasks, addTask, deleteTask, updateTask } = taskSlice.actions  
export default taskSlice.reducer