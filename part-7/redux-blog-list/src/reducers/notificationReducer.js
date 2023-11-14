import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        message: '',
        display: 'none',
        status: ''
    },
    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload
        },
        setDisplay: (state, action) => {
            state.display = action.payload
        },
        setStatus: (state, action) => {
            state.status = action.payload
        }
    }
})

export const { setMessage, setDisplay, setStatus } = notificationSlice.actions
export default notificationSlice.reducer