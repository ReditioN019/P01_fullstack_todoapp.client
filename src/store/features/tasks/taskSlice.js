import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    tasks: [],
    tasksSelected: []
}

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers:{
        getTasks: (state, action) => {
            state.tasks  = action.payload.tasks.sort((a, b) => {
                return ( a.expirationDate > b.expirationDate) ? 1 : -1
            }).sort((a,b) => {
                return (a.completed > b.completed) ? 1 : -1
            })
            // for(let x in a)
            // a[x].completed === true  ? a.push( a.splice(x,1)[0] )  : 0;

        },
        addTask: (state, action) => {      
        },
        updateTask: (state, action) => {
            state.tasks = state.tasks.filter( task => task.id !== action.payload)
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter( task => task.id !== action.payload )
            state.tasksSelected = [];
        },
        handleSelectedTask: (state, action) => {
            const { id, isChecked } = action.payload   
            
            // console.log("Tarea seleccionada: ", action.payload)

            isChecked 
            ? state.tasksSelected.push(action.payload) 
            : state.tasksSelected = state.tasksSelected.filter(task => task.id !== id)
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
            // state.tasks = state.tasks.sort((a,b) => {
            //     return (a.completed > b.completed) ? 1 : -1
            // })
        },
        selectedAllTasks: (state, action) => {;
            state.tasks.forEach(task => {
                state.tasksSelected.push(task)
            })
        },
        removeAllTasks: (state, action) => {
            state.tasks.forEach(task => {
                state.tasksSelected.pop(task)
            })
        }

    }
})

export const { getTasks, addTask, deleteTask, updateTask, changeOpenModal, changeEditCreate, handleSelectedTask, orderTasks, selectedAllTasks,removeAllTasks } = taskSlice.actions  
export default taskSlice.reducer