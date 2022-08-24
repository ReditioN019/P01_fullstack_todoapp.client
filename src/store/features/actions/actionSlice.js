import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    openModal: false, //abrir y cerrar modal
    inEdit: null, //es para saber si se está editando o creando una tarea
}

export const actionSlice = createSlice({
    name: 'actions',
    initialState,
    reducers:{
        changeOpenModal:(state, action) => {
            state.openModal = !state.openModal
        },
        changeEditCreate: (state, action) => {
            state.inEdit = action.payload
        }
    }
})

export const { changeOpenModal, changeEditCreate } = actionSlice.actions  
export default actionSlice.reducer