import { useSelector, useDispatch } from 'react-redux'
import { Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material'
import { changeOrder } from '../../../store/features/table/tableSlice';

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

export const Head = ({ handleChangeChecked }) => {

    const { tasks, tasksSelected } = useSelector(state => state.tasks);
    const { order, orderBy } = useSelector(state => state.taskTable);

    const dispatch = useDispatch();

    const createSortHandler = (property) => () => handleRequestSort(property);

    const handleRequestSort = (property) => dispatch(changeOrder(property));



    return (
        <TableHead>
            <TableRow style={{ backgroundColor: '#FAFAFA' }} >
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={tasksSelected.length > 0 && tasksSelected.length < tasks.length}
                        checked={tasksSelected.length === tasks.length}
                        onClick={(e) => handleChangeChecked(e, null)}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {
                    headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? 'right' : (headCell.numeric == null) ? 'center' : 'left'}
                            padding={headCell.disablePadding ? 'none' : 'normal'}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                                style={{ fontWeight: 'bold' }}
                            >
                                {headCell.label}
                            </TableSortLabel>
                        </TableCell>
                    ))
                }
                <TableCell align="center" style={{ fontWeight: 'bold' }} >Editar</TableCell>
            </TableRow>
        </TableHead>
    )
}
