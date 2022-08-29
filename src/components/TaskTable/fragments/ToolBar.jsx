import { useDispatch, useSelector } from 'react-redux'
import { deleteTaskAPI } from '../../../store/features/tasks/thunks';
import { deselectedTasks } from '../../../store/features/tasks/taskSlice';
import Swal from 'sweetalert2'
import { IoMdAddCircle} from 'react-icons/io';
import { Toolbar, Typography, IconButton, Tooltip} from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList';
import DeleteIcon from '@mui/icons-material/Delete';
import { alpha } from '@mui/material/styles';

export const ToolBar = ({onHanldeOpenModal}) => {

    const { tasksSelected } = useSelector(state => state.tasks);
    const dispatch = useDispatch();

    
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

    return (
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

            {tasksSelected.length > 0 ?
                <Tooltip title="Eliminar">
                    <IconButton onClick={handleDeleteTask}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
                :
                <>
                    <Tooltip title="Agregar tarea">
                        <IconButton
                            style={{ padding: '0', marginRight: '2rem' }}
                            onClick={() => onHanldeOpenModal(null)}
                        >
                            <IoMdAddCircle
                                size={40}
                            />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Filter list">
                        <IconButton>
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                </>
            }
        </Toolbar>
    )
}
