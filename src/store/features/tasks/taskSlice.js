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
            })
            // .sort((a,b) => {
                // return (a.completed > b.completed) ? 1 : -1
            // })
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

            isChecked 
            ? state.tasksSelected.push(action.payload) 
            : state.tasksSelected = state.tasksSelected.filter(task => task.id !== id)
        },
        selectedAllTasks: (state, action) => {;
            state.tasksSelected = []
            state.tasks.forEach(task => {
                state.tasksSelected.push(task)
            })
        },
        removeAllTasks: (state, action) => {
            state.tasks.forEach(task => {
                state.tasksSelected.pop(task)
            })
        },
        deselectedTasks: (state, action) => {
            state.tasksSelected = []
        }

    }
})

export const { getTasks, addTask, deleteTask, updateTask, changeOpenModal, changeEditCreate, handleSelectedTask, selectedAllTasks,removeAllTasks, deselectedTasks } = taskSlice.actions  
export default taskSlice.reducer