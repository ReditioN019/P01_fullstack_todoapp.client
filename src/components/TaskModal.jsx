import { useDispatch, useSelector } from 'react-redux';
import { modalStyles } from '../styles/styles';
import { changeOpenModal } from '../store/features/tasks/taskSlice';
import { dateFormat } from '../helpers/dateTimes';
import { addTaskAPI, updateTaskApi } from '../store/features/tasks/thunks';
import { DateTimePicker } from '@mui/x-date-pickers';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';

export const TaskModal = ({ handleChange, inputs, setInputs }) => {

    const { openModal, inEdit } = useSelector(state => state.tasks);
    const dispatch = useDispatch();

    const { title, description, expirationDate } = inputs;

    const handleAddTask = () => {
        dispatch(addTaskAPI({
            ...inputs,
            expirationDate: dateFormat(expirationDate)
        }))
        dispatch(changeOpenModal(!openModal))
    }

    const handleUpdateTask = () => {
        dispatch(updateTaskApi({
            ...inputs,
            expirationDate: dateFormat(expirationDate)
        }))
        dispatch(changeOpenModal(!openModal))
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
                        fullWidth
                        id="standard-basic"
                        margin="dense"
                        label="Titulo"
                        variant="standard"
                        name="title"
                        type="text"
                        onChange={handleChange}
                        value={title}
                        sx={{ marginTop: 1 }}
                    />
                </Typography>

                <Typography id="modal-modal-title" variant="h6" component="h2">
                    <TextField
                        fullWidth
                        multiline
                        id="outlined-multiline-static"
                        margin="dense"
                        label="Descripción"
                        variant="standard"
                        name="description"
                        type="text"
                        onChange={handleChange}
                        value={description}
                        sx={{ marginTop: 1 }}
                        rows={2}
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
                        onClick={() => dispatch(changeOpenModal(!openModal))}

                    >Cancelar</Button>

                    <Button
                        onClick={inEdit ? handleUpdateTask : handleAddTask}
                        variant="contained"
                        color="success"
                    >
                        Guardar
                    </Button>
                </div>

            </Box>
        </Modal>
    )
}
