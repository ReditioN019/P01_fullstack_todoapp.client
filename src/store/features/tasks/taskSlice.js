import { createSlice } from '@reduxjs/toolkit'

export const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        openModal: false,
        inEdit: null, //es para saber si se está editando o creando una tarea
    }, 
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
        },
        changeOpenModal:(state, action) => {
            state.openModal = !state.openModal
        },
        changeEditCreate: (state, action) => {
            state.inEdit = action.payload
        }

    }
})

export const { getTasks, addTask, deleteTask, updateTask, changeOpenModal, changeEditCreate } = taskSlice.actions  
export default taskSlice.reducer