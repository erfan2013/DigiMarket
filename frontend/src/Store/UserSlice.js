import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    user : null,
 
 }

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails : (state , action) => {
      
      state.user = action.payload
    }
},
})

export const {setUserDetails } = UserSlice.actions

export default UserSlice.reducer