import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { deleteTaskAPI, getTasksAPI, addTaskAPI, updateTaskApi } from '../store/features/tasks/thunks';
import { compareDate, dateFormat } from '../helpers/dateTimes';
import { useForm } from '../hooks/useForm';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers';
import { Box, Card, CardActions, CardContent, Checkbox, Modal, Typography } from '@mui/material';
import { Container } from '@mui/system';

import { CgMathPlus } from 'react-icons/cg';
import { FaTrash } from 'react-icons/fa';
import { BsCheckLg, BsFillClockFill, BsXCircleFill, BsTrash2Fill, BsPencilSquare } from 'react-icons/bs';
import { modalStyles } from '../styles/styles';


export const TaskList = () => {

    const { handleChange, handleReset, inputs, setInputs } = useForm({
        id: '',
        description: '',
        expirationDate: null,
    });
    const { description, expirationDate } = inputs;

    //Accedo a tasks del store, que a su vez, es el initialState
    const { tasks } = useSelector(state => state.tasks);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(getTasksAPI()); //! carga inicial de las tareas de la BD
    }, [])

    const handleAddTask = () => {

        dispatch(addTaskAPI({
            ...inputs,
            expirationDate: dateFormat(expirationDate)
        }))

        handleReset();
        setOpen(!open)
    }
    

    const handleUpdateTask = () => {

        dispatch(updateTaskApi({
            ...inputs,
            expirationDate: dateFormat(expirationDate)
        }))

        handleReset();
        setOpen(!open)
    }

    const handleDeleteTask = (task) => dispatch(deleteTaskAPI(task))


    
    const [edit, setEdit] = useState(false);

    const handleOpenModal = (aux, task) => {

        if (aux) setEdit(false)
        
        else { //!Entra aquí en edición
            setEdit(true);
            setInputs({ ...task })
            setOpen(!open)
        }     
    }




    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };



    return (
        <Container maxWidth="md">
            <header>
                <h1>Cosas por Hacer</h1>

                <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={modalStyles}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            <TextField
                                fullWidth
                                id="standard-basic"
                                margin="dense"
                                label="Descripción"
                                variant="standard"
                                name="description"
                                type="text"
                                onChange={handleChange}
                                value={description}
                                sx={{ marginTop: 1 }}
                            />
                        </Typography>
                        <DateTimePicker
                            label="Fecha de expiración"
                            value={expirationDate}
                            onChange={(value) => setInputs(tasks => ({ ...tasks, expirationDate: value }))}
                            minDate={new Date()}
                            ampm={false}
                            renderInput={(params) =>
                                <TextField
                                    fullWidth
                                    type="datetime"
                                    sx={{ marginTop: 3 }}
                                    {...params}
                                />
                            }
                        />
                        <div style={{ marginTop: '2rem' }}>
                            <Button 
                                onClick={() => setOpen(!open)}
                            
                            >Cancelar</Button>
                            
                            <Button 
                            onClick={ edit ? handleUpdateTask : handleAddTask} 
                            variant="contained" 
                            color="success"
                            >
                                Guardar
                            </Button>
                        </div>

                    </Box>
                </Modal>

            </header>


            {/* ----- CREAR UNA NUEVA TAREA ---- */}
            <Card sx={{ minWidth: 275, maring: "mx-auto", cursor: "pointer", marginTop: '2rem' }}>
                
                <Button 
                fullWidth={true} 
                style={{ border: "none", padding: 0, background: "none", width: '100%' }} 
                variant="outlined" 
                onClick={() => setOpen(true)}
                >
                    <center>
                        <CardContent>
                            <CgMathPlus size={50} />
                        </CardContent>
                    </center>
                </Button>
            </Card>


            {
                tasks.map(task => (
                    <Card
                        key={task.id}
                        sx={{ minWidth: 275, marginTop: '2rem' }}
                    >
                        <CardContent>

                            <Checkbox {...label} />

                            <Typography variant="body2">
                                <b>{task.description}</b>
                            </Typography>

                            <DateTimePicker
                                label="Fecha de creación"
                                readOnly
                                value={task.createdAt}
                                onChange={(value) => setExpirationDate(value)}
                                minDate={new Date()}
                                ampm={false}
                                renderInput={(params) =>
                                    <TextField
                                        type="date"
                                        sx={{ marginTop: 3 }}
                                        {...params}
                                    />
                                }
                            />
                            <DateTimePicker
                                label="Fecha de expiración"
                                readOnly
                                value={task.expirationDate}
                                onChange={(value) => setExpirationDate(value)}
                                minDate={new Date()}
                                ampm={false}
                                renderInput={(params) =>
                                    <TextField
                                        type="date"
                                        sx={{ marginTop: 3 }}
                                        {...params}
                                    />
                                }
                            />

                            {
                                compareDate(task.createdAt, task.expirationDate) <= 0 ?

                                    <BsXCircleFill size={40} color={"red"} /> :

                                    (compareDate(task.createdAt, task.expirationDate) > 0 && compareDate(task.createdAt, task.expirationDate) <= 3) ?

                                        <BsFillClockFill size={40} color={"orange"} /> :

                                        <BsCheckLg size={40} color={"green"} />
                            }


                        </CardContent>
                        <CardActions>

                            <FaTrash
                                style={{cursor: 'pointer', color: '#1976d2'}}
                                onClick={() => handleDeleteTask(task)} 
                                size={"2rem"}
                            />

                            <BsPencilSquare 
                                style={{cursor: 'pointer', color: '#1976d2'}}
                                size={"2rem"}
                                onClick={() => handleOpenModal(false, task)}
                            />

                        </CardActions>

                    </Card>
                ))
            }



        </Container>
    )
}