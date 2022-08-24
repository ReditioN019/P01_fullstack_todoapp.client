import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { deleteTaskAPI, getTasksAPI } from '../store/features/tasks/thunks';
import { useForm } from '../hooks/useForm';
import { orderTasks } from '../store/features/tasks/taskSlice';
import { changeEditCreate, changeOpenModal } from '../store/features/actions/actionSlice';
import { TaskModal } from './TaskModal';
import { TaskItem } from './TaskItem';

import { Container } from '@mui/system';
import { ActionButton } from './ActionButton';
import { Button, Menu, MenuItem, Fade } from '@mui/material';

export const TaskList = () => {

    const { handleChange, handleReset, inputs, setInputs } = useForm({
        id: '',
        description: '',
        expirationDate: null,
    });

    //Accedo a tasks del store, que a su vez, es el initialState
    const { tasks, tasksSelected } = useSelector(state => state.tasks);
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

    const handleDeleteTask = () => {
        Swal.fire({
            title: '¿Está seguro?',
            text: "No podrá volver a recuperar las tareas eliminadas",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, borrarlas!',
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteTaskAPI(tasksSelected))
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Eliminación correcta',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }


    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleOrderMenu = (order) => {
        dispatch(orderTasks(order))
        setAnchorEl(null);
    };

    return (
        <Container maxWidth="md">
            <header>    
                <h1>Cosas por Hacer</h1>
            </header>



            <ActionButton
                handleFunction={() => handleOpenModal(null)}
                text={`Crear tarea`}
                icon={`addTask`}
            />
            <ActionButton
                handleFunction={handleDeleteTask }
                text={'Eliminar Seleccionados'}
                icon={`deleteTask`}
            />

            <Button
                variant="outlined"
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={(event) => setAnchorEl(event.currentTarget)}
            >
                Ordenar Tareas
            </Button>
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={() => handleOrderMenu('order1')}>Fecha de creación</MenuItem>
                <MenuItem onClick={() => handleOrderMenu('order2')}>Fecha de vencimiento</MenuItem>
                <MenuItem onClick={() => handleOrderMenu('order3')}>Estado</MenuItem>
                <MenuItem onClick={() => handleOrderMenu('order4')}>Descripción</MenuItem>
            </Menu>

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