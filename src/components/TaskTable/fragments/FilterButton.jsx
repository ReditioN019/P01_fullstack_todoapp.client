import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList';
import { filterTask } from '../../../store/features/tasks/taskSlice';
import { getTasksAPI } from '../../../store/features/tasks/thunks';

export const FilterButton = () => {

    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => setAnchorEl(null);

    return (
        <>
            <Tooltip title="Filtrar tareas">
                <IconButton onClick={handleClick}>
                    <FilterListIcon />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
            >
                <div onClick={() => dispatch(getTasksAPI())}>
                    <MenuItem onClick={handleClose}>
                        Todas
                    </MenuItem>
                </div>
                <div onClick={() => dispatch(filterTask('CompletedTasks'))}>
                    <MenuItem onClick={handleClose}>
                        Completadas
                    </MenuItem>
                </div>
                <div onClick={() => dispatch(filterTask('slopesTasks'))}>
                    <MenuItem onClick={handleClose}>
                        Pendientes
                    </MenuItem>
                </div>
                <div onClick={() => dispatch(filterTask('expiredTasks'))}>
                    <MenuItem onClick={handleClose}>
                        Vencidas
                    </MenuItem>
                </div>
            </Menu>
        </>
    )
}
