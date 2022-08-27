import { taskApi } from "../../../api/taskApi";
import { getTasks, addTask, deleteTask, updateTask } from "./taskSlice"


export const getTasksAPI = () => {
    return async( dispatch, getState ) => {
        
        const { data } = await taskApi.get();
        dispatch( getTasks({tasks: data}));
    }
}      

export const addTaskAPI = newTask => {
    return async (dispatch, getState) => {

        await taskApi.post('',{
            description: newTask.description,
            expirationDate: newTask.expirationDate
        })
        .then((response) => {
            dispatch(addTask(newTask));
            dispatch(getTasksAPI())
        })
    }
}

export const updateTaskApi = task => {
    return async(dispatch, getState) => {

        await taskApi.patch( task.id, {
            description: task.description,
            expirationDate: task.expirationDate,
            completed: task.completed,
            isChecked: task.isChecked
        })
        .then((response) =>{
            dispatch(updateTask(task))  
            dispatch(getTasksAPI())           
        }) 
    }
}

export const deleteTaskAPI = task => {
    return (dispatch, getState) => {

        task.forEach( async (item) => {
            await taskApi.delete(item.id)
            .then((response) => dispatch(deleteTask(item.id)));
        })
        
        
    }
}
