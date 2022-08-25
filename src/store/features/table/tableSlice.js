import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    order: 'asc'
}

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {}
});

export const {} = tableSlice.actions

export default tableSlice.reducer