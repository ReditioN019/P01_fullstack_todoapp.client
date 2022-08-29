import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    order: 'asc', //por defecto estará en order ascendente
    orderBy: 'description', //la columna especificada estara ordenada de forma asc
    page: 0, //número de páginas inicial
    rowsPerPage: 5 //filas por página
}

const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        changeOrder: (state, action) => {
            const isAsc = state.orderBy === action.payload && state.order === 'asc';
            state.order = (isAsc) ? 'desc' : 'asc';
            state.orderBy = action.payload
        },
        changeRowsPerPage: (state, action) => {
            //se cambia la cantidad de filas que se mostrará por pág
            const value = action.payload;
            state.rowsPerPage = parseInt(value, 10);
            state.page = 0;
        },
        changePage: (state, action) => {
            state.page = action.payload
        }
    }
});

export const { changeOrder, changeRowsPerPage, changePage } = tableSlice.actions

export default tableSlice.reducer