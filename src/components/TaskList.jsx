import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { deleteTaskAPI, getTasksAPI } from '../store/features/tasks/thunks';
import { useForm } from '../hooks/useForm';
import { changeEditCreate, changeOpenModal } from '../store/features/tasks/taskSlice';
import { TaskModal } from './TaskModal';
import { TaskItem } from './TaskItem';

import Button from '@mui/material/Button';
import { Container } from '@mui/system';

import { AiFillFileAdd } from 'react-icons/ai';
import { FaTrash } from 'react-icons/fa';

export const TaskList = () => {

    const { handleChange, handleReset, inputs, setInputs } = useForm({
        id: '',
        title: '',
        description: '',
        expirationDate: null,
    });

    //Accedo a tasks del store, que a su vez, es el initialState
    const { tasks, openModal, tasksSelected } = useSelector(state => state.tasks);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTasksAPI());
    }, [])

    const handleDeleteTask = () => dispatch(deleteTaskAPI(tasksSelected))

    const handleOpenModal = (task) => {

        if (!task) {
            handleReset();
            dispatch(changeEditCreate(false))
        }
        else {//edición
            setInputs({ ...task })
            dispatch(changeEditCreate(true))
        }

        dispatch(changeOpenModal(!openModal))
    }

    return (
        <Container maxWidth="md">
            <header>
                <h1>Cosas por Hacer</h1>
                <p>
                    Primero preguntar si está seguro de borrar. <br />
                    Finalmente, poner un boton de restaurar (las tareas borradas se guardan al localstorage)
                </p>
            </header>

            <Button
                variant="outlined"
                onClick={() => handleOpenModal(null)}
            >
                Crear tarea
                <AiFillFileAdd
                    size={20}
                    style={{ marginLeft: "1rem" }}
                />
            </Button>

            <Button
                variant="outlined"
                onClick={() => handleDeleteTask()}
            >
                Limpiar Seleccionados
                <FaTrash
                    size={20}
                    style={{ marginLeft: "1rem" }}
                />
            </Button>

            {
                tasks.map(task => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        handleOpenModal={handleOpenModal}
                    />
                ))
            }



            <TaskModal
                handleChange={handleChange}
                inputs={inputs}
                setInputs={setInputs}
            />
        </Container>
    )
}