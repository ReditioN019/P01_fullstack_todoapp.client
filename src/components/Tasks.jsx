import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { getTasksAPI } from '../store/features/tasks/thunks';
import { TaskTable } from './TaskTable';
import { useForm } from '../hooks/useForm';
import { TaskModal } from './TaskModal';
import { Container } from '@mui/system';

export const Tasks = () => {

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