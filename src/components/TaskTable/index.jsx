import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { handleSelectedTask, removeAllTasks, selectedAllTasks } from '../../store/features/tasks/taskSlice';
import { changeEditCreate, changeOpenModal } from '../../store/features/actions/actionSlice';
import { ToolBar, Head, Body } from './fragments'
import { Box, Table, TableContainer, TablePagination, Paper } from '@mui/material'
import { changePage, changeRowsPerPage } from '../../store/features/table/tableSlice';


export const TaskTable = ({ handleReset, setInputs }) => {

    const { tasks } = useSelector(state => state.tasks);
    const { page, rowsPerPage } = useSelector(state => state.taskTable);
    const { openModal } = useSelector(state => state.actions);
    
    const dispatch = useDispatch();


    const handleChangePage = (event, newPage) => dispatch(changePage(newPage));
    

    const handleChangeRowsPerPage = ({ target }) => {
        dispatch(changeRowsPerPage(target.value))
    };


    const handleChangeChecked = ({ target }, id) => {
        if (!id) {
            if (target.checked) dispatch(selectedAllTasks())

            if (!target.checked) dispatch(removeAllTasks())
        }
        else {
            const isChecked = target.checked;
            dispatch(handleSelectedTask({ id, isChecked }))

        }
    }

    const handleOpenModal = (task) => {

        if (!task) {
            handleReset();
            dispatch(changeEditCreate(false))
        }
        else {//edición
            setInputs({ ...task })
            dispatch(changeEditCreate(true))
        }

        dispatch(changeOpenModal(!openModal))
    }

    
    return (
        <Box>
            <Paper>             
                <ToolBar 
                    onHanldeOpenModal={handleOpenModal}
                />

                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                    >

                        <Head 
                            handleChangeChecked={handleChangeChecked}
                        />

                      
                        <Body 
                            handleChangeChecked={handleChangeChecked}
                            handleOpenModal={handleOpenModal}
                        />

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
