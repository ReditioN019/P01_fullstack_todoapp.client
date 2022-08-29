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
            state.tasks = action.payload.tasks;
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter( task => task.id !== action.payload )
            state.tasksSelected = [];
        },
        selectedTask: (state, action) => {
            const { id, isChecked } = action.payload   

            if(isChecked) state.tasksSelected.push(action.payload); 
            else
                state.tasksSelected = state.tasksSelected.filter(task => task.id !== id);
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

export const { getTasks, deleteTask, changeOpenModal, changeEditCreate, selectedTask, selectedAllTasks,removeAllTasks, deselectedTasks } = taskSlice.actions  
export default taskSlice.reducer