import { useDispatch, useSelector } from 'react-redux'
import { Checkbox, FormControlLabel, IconButton, Switch, TableBody, TableCell, TableRow, Tooltip } from "@mui/material"
import { checkDate, compareDate } from '../../../helpers/dateTimes';
import { BsPencilSquare } from 'react-icons/bs'
import { updateTaskApi } from '../../../store/features/tasks/thunks';

//TODO: ORDER COLUMN
const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

//TODO: ORDER COLUMNS
const getComparator = (order, orderBy) => {
    if(order === 'desc') return (a, b) => descendingComparator(a, b, orderBy)
    else return (a,b) => -descendingComparator(a, b, orderBy);
}

export const Body = ({ handleChangeChecked, handleOpenModal}) => {

    const { tasks, tasksSelected, filtered, filterTask } = useSelector(state => state.tasks);
    const { order, orderBy, page, rowsPerPage } = useSelector(state => state.taskTable)
    const dispatch = useDispatch();


    //! Esto sirve para establecer el número de filas seleccionadas (lo muestra arriba)
    const handleClick = (name) => {

        const selectedIndex = tasksSelected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1)
            newSelected = newSelected.concat(tasksSelected, name);
        else if (selectedIndex === 0)
            newSelected = newSelected.concat(tasksSelected.slice(1));
        else if (selectedIndex === tasksSelected.length - 1)
            newSelected = newSelected.concat(tasksSelected.slice(0, -1));
        else if (selectedIndex > 0)
            newSelected = newSelected.concat(
                tasksSelected.slice(0, selectedIndex),
                tasksSelected.slice(selectedIndex + 1),
            );
    };

    const handleChangeCompleted = ({ target }, task) => {

        if (target.checked) {
            dispatch(updateTaskApi({
                ...task,
                completed: true
            }))
        }
        else {
            dispatch(updateTaskApi  ({
                ...task,
                completed: false
            }))
        }
    }

    // Evita un salto de diseño al llegar a la última página con filas vacías.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tasks.length) : 0;

    //**** Funcion que deja seleccionada la fila si es checkeada
    const isSelected = (id) => tasksSelected.some(task => task.id === id);

    const dateFormat = (date) => {
        date = new Date(date)
        return date.toLocaleString();
    }

    const items = filtered ? filterTask : tasks;

    return (
        <TableBody>
            { items.slice().sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => ((
                    <TableRow
                        hover
                        key={row.id}
                        onClick={() => handleClick(row.name)}
                        role="checkbox"
                        selected={isSelected(row.id)}
                        style={{
                            backgroundColor:
                                checkDate(row.expirationDate) 
                                ? '#E3E3E3' :
                                compareDate(row.createdAt, row.expirationDate) <= 0
                                    ? '#FFE5E5' :
                                (compareDate(row.createdAt, row.expirationDate) > 0 && compareDate(row.createdAt, row.expirationDate) <= 3)
                                    ? '#FFF8DB' : 
                                '#F0FFDD',
                            borderRadius: '20px',
                            textDecoration: checkDate(row.expirationDate) && 'line-through'
                        }}
                    >
                        <TableCell padding="checkbox">
                            <Checkbox
                                onChange={(e) => handleChangeChecked(e, row.id)}
                                checked={isSelected(row.id)}
                                inputProps={{
                                    'aria-labelledby': `enhanced-table-checkbox-${index}`,
                                }}
                            />
                        </TableCell>
                        <TableCell
                            component="th"
                            scope="row"
                            padding="none"
                        >
                            {row.description}
                        </TableCell>
                        <TableCell align="right">{dateFormat(row.createdAt)}</TableCell>
                        <TableCell align="right">{dateFormat(row.expirationDate)}</TableCell>
                        <TableCell align="center">
                            <FormControlLabel
                                disabled={checkDate(row.expirationDate) ? true: false}
                                checked={
                                    row.completed ? true : false
                                }
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

                )))
            }

            {emptyRows > 0 && (
                <TableRow>
                    <TableCell colSpan={6} />
                </TableRow>
            )}

        </TableBody>
    )
}
