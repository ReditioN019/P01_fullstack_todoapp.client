import { createSlice } from '@reduxjs/toolkit'
import { checkDate } from '../../../helpers/dateTimes';

const initialState = {
    tasks: [],
    tasksSelected: [],
    filterTask: [],
    filtered: false,
}

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers:{
        getTasks: (state, action) => {
            state.tasks = action.payload.tasks;
            state.filtered = false;
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
        },
        filterTask: (state, action) => {
            const option = action.payload
            if (option === 'CompletedTasks'){
                state.filterTask = state.tasks.filter(task => 
                    task.completed === true
                );
            }
            if (option === 'slopesTasks'){
                state.filterTask = state.tasks.filter(task => 
                    task.completed !== true
                );
            }
            if (option === 'expiredTasks'){
                state.filterTask = state.tasks.filter(task => {
                    const expiratedTask = checkDate(task.expirationDate);
                    if(expiratedTask){
                        return state.filterTask = task
                    }
                });
            }

            state.filtered = true;
        }

    }
})

export const { getTasks, deleteTask, changeOpenModal, changeEditCreate, selectedTask, selectedAllTasks,removeAllTasks, deselectedTasks, filterTask } = taskSlice.actions  
export default taskSlice.reducer