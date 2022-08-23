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

            let tasksFromDB = action.payload.tasks
            tasksFromDB = action.payload.tasks.sort((a, b) => {
                return ( a.expirationDate > b.expirationDate) ? 1 : -1
            }) 
            state.tasks = tasksFromDB; 
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
        },
        orderTasks: (state, action) => {
            if(action.payload === 'order1'){ //Por fecha de creación
                state.tasks = state.tasks.sort((a, b) => {
                    return ( a.createdAt > b.createdAt) ? 1 : -1
                }) 
            }
            if(action.payload === 'order2'){ //Por fecha de vencimiento
                state.tasks = state.tasks.sort((a, b) => {
                    return ( a.expirationDate > b.expirationDate) ? 1 : -1
                }) 
            }
            if(action.payload === 'order3'){ //Por estado
                state.tasks = state.tasks.sort((a, b) => {
                    return ( a.completed > b.completed) ? 1 : -1
                }) 
            } 
            if(action.payload === 'order4'){ //Por texto
                state.tasks = state.tasks.sort((a, b) => {
                    return (a.description.toLowerCase() > b.description.toLowerCase()) ? 1: -1
                })
            } 
        }

    }
})

export const { getTasks, addTask, deleteTask, updateTask, changeOpenModal, changeEditCreate, handleSelectedTask, orderTasks } = taskSlice.actions  
export default taskSlice.reducer