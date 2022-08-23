import { useDispatch } from 'react-redux'
import { Card, Checkbox, FormControlLabel, Grid, IconButton, Switch, TextField, Tooltip, Typography } from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers'
import { BsPencilSquare } from 'react-icons/bs'
import { compareDate } from '../helpers/dateTimes'
import { handleSelectedTask } from '../store/features/tasks/taskSlice'
import { updateTaskApi } from '../store/features/tasks/thunks'

export const TaskItem = ({ task, handleOpenModal }) => {

    const { id, description, createdAt, expirationDate, completed } = task;
    const dispatch = useDispatch();

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const handleChangeChecked = ({ target }, id) => {
        const isChecked = target.checked;
        dispatch(handleSelectedTask({ id, isChecked }))
    }

    const handleChangeCompleted = ({ target }) => {
        if (target.checked) {
            dispatch(updateTaskApi({
                ...task,
                completed: true
            }))
        }
        else {
            dispatch(updateTaskApi({
                ...task,
                completed: false
            }))
        }
    }

    return (
        <Card
            sx={{ minWidth: 275, marginTop: '2rem' }}
            style={{
                backgroundColor:
                    compareDate(createdAt, expirationDate) <= 0
                        ? '#FF8888' :
                        (compareDate(createdAt, expirationDate) > 0 && compareDate(createdAt, expirationDate) <= 3)
                            ? '#FFD95F' : '#C4EC96',
                borderRadius: '20px'
            }}
        >

            <Grid container justifyContent="space-between" alignItems="center" sx={{ px: 2, py: 2 }}>
                

                <Tooltip title="Seleccionar Tarea">
                    <IconButton>
                        <Checkbox
                            {...label}
                            sx={{}}
                            onChange={(e) => handleChangeChecked(e, id)}
                        />
                    </IconButton>
                </Tooltip>

                <FormControlLabel
                    label="Completada"
                    checked={completed ? true : false}
                    control={
                        <Switch
                            onChange={handleChangeCompleted}
                        />
                    }
                />
                

                <Tooltip title="Editar Tarea">
                    <IconButton
                        onClick={() => handleOpenModal(task)}
                    >
                        <BsPencilSquare
                            style={{ cursor: 'pointer', color: '#1976d2' }}
                            size={"1.5rem"}

                        />
                    </IconButton>
                </Tooltip>
            </Grid>



            <Grid container spacing={2} alignItems="center" sx={{ pb: 4 }}>
                <Grid container item xs={12} justifyContent="space-around" alignItems="center">
                    <Typography variant="body1">
                        {description}
                    </Typography>

                    <DateTimePicker
                        label="Fecha de expiración"
                        readOnly
                        value={expirationDate}
                        onChange={(value) => dispatch(updateTaskApi({ ...task, value }))}
                        minDate={new Date()}
                        ampm={false}
                        renderInput={(params) =>
                            <TextField
                                type="date"
                                sx={{ my: 1 }}
                                {...params}
                                style={{ backgroundColor: 'white' }}
                            />
                        }
                    />

                </Grid>

            </Grid>

        </Card>
    )
}
