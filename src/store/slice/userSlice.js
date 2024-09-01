import { createSlice } from "@reduxjs/toolkit"
import { SET_USER } from "../../utils/actionType"

const prevState = SET_USER

const initialState = {
    user: prevState ? { SET_USER } : null,
}

const userSlice = createSlice({
    initialState,
    name: "user",
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        clearUser: (state) => {
            state.user = null
        }
    }
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer