import { useDispatch } from 'react-redux'
import { BsPencilSquare } from 'react-icons/bs'
import { compareDate } from '../helpers/dateTimes';
import { handleSelectedTask } from '../store/features/tasks/taskSlice';
import { updateTaskApi } from '../store/features/tasks/thunks';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, FormControlLabel, IconButton, Switch, Tooltip} from '@mui/material';

export const TaskTable = ({ tasks, handleOpenModal }) => {


    const dispatch = useDispatch();

    const handleChangeChecked = ({ target }, id) => {
        const isChecked = target.checked;
        dispatch(handleSelectedTask({ id, isChecked }))
    }

    const handleChangeCompleted = ({ target }, task) => {

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

    const formatearFecha = (date) => {
        date = new Date(date)
        return date.toLocaleString()
    }

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    return (
        <TableContainer style={{ borderRadius: "10px" }}>
            <Table >
                <TableHead>
                    <TableRow style={{backgroundColor: '#EBEBEB'}}>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center">Descripción</TableCell>
                        <TableCell align="center">Fecha de Creación</TableCell>
                        <TableCell align="center">Fecha de expiración</TableCell>
                        <TableCell align="center">¿Completa?</TableCell>
                        <TableCell align="center">Editar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks.map((row) => (
                        <TableRow
                            key={row.id}
                            style={{
                                backgroundColor:
                                    compareDate(row.createdAt, row.expirationDate) <= 0
                                        ? '#FFDADA' :
                                        (compareDate(row.createdAt, row.expirationDate) > 0 && compareDate(row.createdAt, row.expirationDate) <= 3)
                                            ? '#FFEFBD' : '#E7FFCA',
                                borderRadius: '20px'
                            }}
                        >
                            <TableCell align='right'>
                                <Tooltip title="Seleccionar Tarea">
                                    <IconButton>
                                        <Checkbox
                                            {...label}
                                            sx={{}}
                                            onChange={(e) => handleChangeChecked(e, row.id)}
                                        />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                            <TableCell align='center'>
                                {row.description}
                            </TableCell>
                            <TableCell align="center">{ formatearFecha(row.createdAt) }
                            </TableCell>
                            <TableCell align="center">{formatearFecha(row.expirationDate)}</TableCell>
                            <TableCell align="center">
                                <FormControlLabel
                                    checked={row.completed ? true : false}
                                    control={
                                        <Switch
                                            onChange={(e) => handleChangeCompleted(e, row)}
                                        />
                                    }
                                />
                            </TableCell>
                            <TableCell align="center">
                                <Tooltip title="Editar Tarea" >
                                    <IconButton
                                        onClick={() => handleOpenModal(row)}
                                    >
                                        <BsPencilSquare
                                            style={{ cursor: 'pointer', color: '#1976d2' }}
                                            size={"1.5rem"}
                                        />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
