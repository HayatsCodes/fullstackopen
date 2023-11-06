import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        displayNotification(state, action) {
            return action.payload
        }
    }
})

export const { displayNotification } = notificationSlice.actions

export const setNotification = (message, time) => {
    return dispatch => {
        dispatch(displayNotification(message))
        setTimeout(() => {
            dispatch(displayNotification(''))
        }, time)
    }
}

export default notificationSlice.reducer