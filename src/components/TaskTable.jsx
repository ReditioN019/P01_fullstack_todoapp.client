import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { alpha } from '@mui/material/styles';
import Swal from 'sweetalert2'
import { deselectedTasks, handleSelectedTask, removeAllTasks, selectedAllTasks } from '../store/features/tasks/taskSlice';
import { deleteTaskAPI, updateTaskApi } from '../store/features/tasks/thunks';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Toolbar, Typography, Paper, Checkbox, IconButton, Tooltip, FormControlLabel, Switch } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { BsPencilSquare } from 'react-icons/bs'
import { compareDate } from '../helpers/dateTimes';


//TODO: ORDER COLUMN
function descendingComparator(a, b, orderBy) {
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

//TODO: Esto es lo que va en la primera fila de la tabla
const headCells = [
    {
        id: 'description',
        numeric: false,
        disablePadding: true,
        label: 'Descripción',
    },
    {
        id: 'createdAt',
        numeric: true,
        disablePadding: false,
        label: 'Creación',
    },
    {
        id: 'expirationDate',
        numeric: true,
        disablePadding: false,
        label: 'Expira',
    },
    {
        id: 'completed',
        numeric: null,
        disablePadding: false,
        label: 'Completa',
    }
];


export const TaskTable = ({ handleOpenModal }) => {

    // console.log(tasks)
    const { tasks, tasksSelected } = useSelector(state => state.tasks);
    const dispatch = useDispatch();

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('description');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);


    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    const createSortHandler = (property) => () => handleRequestSort(property);


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

    const handleChangePage = (event, newPage) => setPage(newPage);

    const handleChangeRowsPerPage = ({ target }) => {
        setRowsPerPage(parseInt(target.value, 10));
        setPage(0);
    };

   
    // Evita un salto de diseño al llegar a la última página con filas vacías.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tasks.length) : 0;

    
    //?================================================================================
    

    const formatearFecha = (date) => {
        date = new Date(date)
        return date.toLocaleString()
    }


    const handleChangeChecked = ({ target }, id) => {
        if (!id) {
            if (target.checked) {
                dispatch(selectedAllTasks())
            }
            if (!target.checked)
                dispatch(removeAllTasks())
        }
        else {
            const isChecked = target.checked;
            dispatch(handleSelectedTask({ id, isChecked }))

        }
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
            else {
                dispatch(deselectedTasks())
            }
        })
    }

    //**** Funcion que deja seleccionada la fila si es checkeada
    const isSelected = (id) => tasksSelected.some(task => task.id === id)


    return (
        <Box>
            <Paper>
                <Toolbar
                    sx={{
                        ...(tasksSelected.length > 0 && {
                            bgcolor: (theme) =>
                                alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                        }),
                    }}
                >
                    {tasksSelected.length > 0 ? (
                        <Typography
                            sx={{ flex: '1 1 100%' }}
                            color="inherit"
                            variant="subtitle1"
                            component="div"
                        >
                            Seleccionado: {tasksSelected.length}
                        </Typography>
                    ) : (
                        <Typography
                            sx={{ flex: '1 1 100%', fontWeight: 'bold' }}
                            variant="h6"
                            id="tableTitle"
                            component="div"
                        >
                            Tareas
                        </Typography>
                    )}

                    {tasksSelected.length > 0 ? (
                        <Tooltip title="Eliminar">
                            <IconButton onClick={handleDeleteTask}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <Tooltip title="Filter list">
                            <IconButton>
                                <FilterListIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                </Toolbar>


                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                    >

                        <TableHead>
                            <TableRow style={{backgroundColor: '#FAFAFA'}} >
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        indeterminate={tasksSelected.length > 0 && tasksSelected.length < tasks.length}
                                        checked={tasksSelected.length === tasks.length}
                                        onClick={(e) => handleChangeChecked(e, null)}
                                        inputProps={{'aria-label': 'select all desserts'}}
                                    />
                                </TableCell>
                                
                                { headCells.map((headCell) => (
                                    <TableCell
                                        key={headCell.id}
                                        align={headCell.numeric ? 'right' : (headCell.numeric == null) ? 'center' : 'left' }
                                        padding={headCell.disablePadding ? 'none' : 'normal'}
                                    >
                                        <TableSortLabel
                                            active={orderBy === headCell.id}
                                            direction={orderBy === headCell.id ? order : 'asc'}
                                            onClick={createSortHandler(headCell.id)}
                                            style={{fontWeight: 'bold'}}
                                        >
                                            {headCell.label}
                                        </TableSortLabel>
                                    </TableCell>
                                ))}


                                <TableCell align="center" style={{fontWeight: 'bold'}} >Editar</TableCell>
                            </TableRow>
                        </TableHead>


                        <TableBody>
                            { tasks.slice().sort(getComparator(order, orderBy))
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
                                                compareDate(row.createdAt, row.expirationDate) <= 0
                                                    ? '#FFE5E5' :
                                                    (compareDate(row.createdAt, row.expirationDate) > 0 && compareDate(row.createdAt, row.expirationDate) <= 3)
                                                        ? '#FFF8DB' : '#F0FFDD',
                                            borderRadius: '20px'
                                        }}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                // inputProps= {{'aria-label': 'Checkbox demo' }}
                                                onChange={(e) => handleChangeChecked(e, row.id)}
                                                checked={isSelected(row.id)}
                                                inputProps={{
                                                    'aria-labelledby': `enhanced-table-checkbox-${index}`,
                                                }}

                                            // checked={tasksSelected.length === tasks.length && true}
                                            />
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            padding="none"
                                        >
                                            {row.description}
                                        </TableCell>
                                        <TableCell align="right">{formatearFecha(row.createdAt)}</TableCell>
                                        <TableCell align="right">{formatearFecha(row.expirationDate)}</TableCell>
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

                                )))
                            }

                            {emptyRows > 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}

                        </TableBody>

                    </Table>

                </TableContainer>


                <TablePagination
                    labelRowsPerPage={"Filas por página"}
                    labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={tasks.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />


            </Paper>

        </Box>
    );
}
