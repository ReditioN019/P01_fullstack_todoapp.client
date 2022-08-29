import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { getTasksAPI } from '../store/features/tasks/thunks';
import { TaskTable } from './TaskTable';
import { useForm } from '../hooks/useForm';
import { TaskModal } from './TaskModal';
import { Container } from '@mui/system';

export const TaskList = () => {

    const { handleChange, handleReset, inputs, setInputs } = useForm({
        id: '',
        description: '',
        expirationDate: null,
    }); 

    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTasksAPI());
    }, [])



    return (
        <Container maxWidth="md">
            <header>
                <h1>Cosas por Hacer</h1>
                <ol>
                    <li>VOLVER A REVISAR CÓDIGO DE TABLA A PROFUNDIDAD Y OPTIMIZAR</li>
                    <li>Estoy casi seguro que si uso redux, mejor reemplazar el useState y poner estados en un slice</li>
                    <li>Añadir buscador de tareas (despues de tener código ordenado)</li>
                    <li>Arreglar que cuando creo una tarea que quede color verde. Al pasar fecha donde deba cambiar a amarillo no lo hace</li>
                    <li>Validar descripción de tarea que ya existe</li>
                    <li>Cuando creo una tarea y queda color veder, despues la actualizo a hoy por ej, sigue verder</li>
                </ol>
            </header>

  
            <TaskTable 
                handleReset={handleReset}
                setInputs={setInputs}
            />

            <TaskModal
                handleChange={handleChange}
                inputs={inputs}
                setInputs={setInputs}
            />
            
        </Container>
    )
}