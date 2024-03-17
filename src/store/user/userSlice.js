import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    id: null,
    name: null,
    email: null
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUser: (state, action) => {
            state.email = action.payload.email
            state.name = action.payload.name,
            state.id = action.payload.id
        }
    }
})

export const { updateUser } = userSlice.actions
export default userSlice.reducer