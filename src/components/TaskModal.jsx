import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux';
import { modalStyles } from '../styles/styles';
import { checkDate, dateFormatForSaveInDB } from '../helpers/dateTimes';
import { addTaskAPI, updateTaskApi } from '../store/features/tasks/thunks';
import { changeOpenModal } from '../store/features/modal/modalSlice';
import { DateTimePicker } from '@mui/x-date-pickers';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';

export const TaskModal = ({ handleChange, inputs, setInputs }) => {

    const { openModal, inEdit } = useSelector(state => state.modals);
    const dispatch = useDispatch();

    const { description, expirationDate } = inputs;

    const handleAddTask = () => {
        
        dispatch(addTaskAPI({
            ...inputs,
            expirationDate: dateFormatForSaveInDB(expirationDate)
        }))
        dispatch(changeOpenModal(!openModal))

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Nueva tarea creada correctamente',
            showConfirmButton: false,
            timer: 1500
        })
    }

    const handleUpdateTask = () => {
        dispatch(updateTaskApi({
            ...inputs,
            expirationDate: dateFormatForSaveInDB(expirationDate)
        }))
        dispatch(changeOpenModal(!openModal))
        
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Tarea editada',
            showConfirmButton: false,
            timer: 1500
        })
    }

    return (
        <Modal
            open={openModal}
            onClose={() => dispatch(changeOpenModal(!openModal))}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyles}>

                <Typography id="modal-modal-title" variant="h6" component="h2">
                    <TextField
                        autoFocus 
                        error={
                            (description.length >= 1 && description.length < 5 )
                            && true
                        }
                        fullWidth
                        label="Descripci??n"
                        variant="outlined"
                        color='success'
                        name="description"
                        value={description}
                        type="text"
                        onChange={handleChange}
                        sx={{ marginTop: 1 }}
                        helperText={ 
                            (description.length >= 1 && description.length < 5 ) 
                            && "M??nimo 5 caract??res" 
                        }
                    />
                </Typography>
                <DateTimePicker
                    label="Fecha de expiraci??n"
                    value={expirationDate}
                    onChange={(value) => setInputs(tasks => ({ ...tasks, expirationDate: value }))}
                    minDate={new Date()}
                    ampm={false}
                    renderInput={(params) =>
                        <TextField
                            fullWidth
                            color='success'
                            type="datetime"
                            sx={{ marginTop: 3 }}
                            {...params}
                            helperText={ 
                                expirationDate == null 
                                && "Debe ser mayor a la fecha y hora actual" 
                            }   
                            error={ 
                                ( expirationDate == null || checkDate(expirationDate) )
                                && true
                            }
                        />
                    }
                />
                
                <div style={{ marginTop: '2rem' }}>
                    <Button
                        onClick={() => dispatch(changeOpenModal(!openModal))}
                    >Cancelar</Button>

                    <Button
                        onClick={inEdit ? handleUpdateTask : handleAddTask}
                        variant="contained"
                        color="success"
                        disabled={ 
                            ( description.length < 5 || 
                                expirationDate == null || 
                                checkDate(expirationDate)
                            )
                            && true 
                        }
                    >
                        Guardar
                    </Button>
                </div>

            </Box>
        </Modal>
    )
}
