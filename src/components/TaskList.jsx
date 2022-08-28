import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {  getTasksAPI } from '../store/features/tasks/thunks';
import { TaskTable } from './TaskTable';
import { useForm } from '../hooks/useForm';
import { changeEditCreate, changeOpenModal } from '../store/features/actions/actionSlice';
import { ActionButton } from './ActionButton';
import { TaskModal } from './TaskModal';
import { Container } from '@mui/system';

export const TaskList = () => {

    const { handleChange, handleReset, inputs, setInputs } = useForm({
        id: '',
        description: '',
        expirationDate: null,
    }); 

    const { openModal } = useSelector(state => state.actions);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTasksAPI());
    }, [])

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
                <ol>
                    <li>VOLVER A REVISAR CÓDIGO DE TABLA A PROFUNDIDAD Y OPTIMIZAR</li>
                    <li>Ordenar código. Esto hacerlo viendo el curso de react de fazt</li>
                    <li>Añadir buscador de tareas (despues de tener código ordenado)</li>
                    <li>Ver la posibilidad de páginar desde backend y frontend con tabla.</li>
                </ol>
            </header>

  
            <ActionButton
                handleFunction={() => handleOpenModal(null)}
                text={`Crear tarea`}
                icon={`addTask`}
            />


            <TaskTable 
                handleOpenModal={handleOpenModal}
            />

            <TaskModal
                handleChange={handleChange}
                inputs={inputs}
                setInputs={setInputs}
            />
            
        </Container>
    )
}