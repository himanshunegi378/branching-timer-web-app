import { createSlice } from '@reduxjs/toolkit';

export const notificationSlice = createSlice({
    name:'notification',
    initialState:{
        asked:false,
        allowed:false
    },
    reducers:{
        setPermission: (state,action)=>{
            state.asked =true
            state.allowed = action.payload.allowed
        }
    }
})

export const {setPermission} = notificationSlice.actions
export default notificationSlice.reducer;
