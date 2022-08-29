import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    openModal: false, //abrir y cerrar modal
    inEdit: null, //es para saber si se está editando o creando una tarea
}

export const modalSlice = createSlice({
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

export const { changeOpenModal, changeEditCreate } = modalSlice.actions  
export default modalSlice.reducer