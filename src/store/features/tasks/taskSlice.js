import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    tasks: [],
    openModal: false, //abrir y cerrar modal
    inEdit: null, //es para saber si se está editando o creando una tarea
    tasksSelected: []
}

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
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
            state.tasksSelected = [];
        },
        changeOpenModal:(state, action) => {
            state.openModal = !state.openModal
        },
        changeEditCreate: (state, action) => {
            state.inEdit = action.payload
        },
        handleSelectedTask: (state, action) => {
            const { id, isChecked } = action.payload    

            isChecked ? //agrego la tarea al array
            state.tasksSelected.push(action.payload) 
            : 
            state.tasksSelected = state.tasksSelected.filter(task => task.id !== id)
        }

    }
})

export const { getTasks, addTask, deleteTask, updateTask, changeOpenModal, changeEditCreate, handleSelectedTask } = taskSlice.actions  
export default taskSlice.reducer