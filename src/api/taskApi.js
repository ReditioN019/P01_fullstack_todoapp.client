import axios from 'axios';

export const taskApi = axios.create({
    baseURL: 'https://srojo-task-app.herokuapp.com/api/tasks'
})