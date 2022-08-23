import axios from 'axios';
import { getTasks, addTask, deleteTask, updateTask } from "./taskSlice"

export const getTasksAPI = () => {
    return async( dispatch, getState ) => {
        
        const { data } = await axios.get('http://localhost:3000/api/tasks');
        dispatch( getTasks({tasks: data}));
    }
}      

export const addTaskAPI = (newTask) => {
    return async (dispatch, getState) => {

        await axios.post('http://localhost:3000/api/tasks',{
            description: newTask.description,
            expirationDate: newTask.expirationDate
        })
        .then((response) => {
            dispatch(addTask(newTask));
            dispatch(getTasksAPI())
        })
    }
}

export const updateTaskApi = (task) => {
    return async(dispatch, getState) => {

        await axios.patch(`http://localhost:3000/api/tasks/${task.id}`, {
            description: task.description,
            expirationDate: task.expirationDate,
            completed: task.completed
        })
        .then((response) =>{
            dispatch(updateTask(task))  
            dispatch(getTasksAPI())           
        }) 
    }
}


export const deleteTaskAPI = (task) => {
    return (dispatch, getState) => {

        task.forEach( async (item) => {
            await axios.delete(`http://localhost:3000/api/tasks/${item.id}`)
                .then((response) => dispatch(deleteTask(item.id)));
        })
        
        
    }
}
