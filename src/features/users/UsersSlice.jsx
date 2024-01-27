import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
let URL = "http://localhost:3000/users";
export const fetchUsers = createAsyncThunk("users/fetchUsers", async()=>{
const response = await axios.get(URL);
    return response
})
export const addUser = createAsyncThunk('users/addUser', async(payload)=>{
    const response = await axios.post(URL, payload)
    return response
})
export const updateUser = createAsyncThunk('users/updateUser', async(payload)=>{
    const response = await axios.put(`${URL}/${payload.id}`, payload)
    return response
})
export const userDeleted = createAsyncThunk('users/userDeleted', async(id)=> {
  await axios.delete(`${URL}/${id}`)
  return id
});
const UsersSlice = createSlice({
    name: "users",
    initialState: {data:[]},
    reducers:{},
    extraReducers: (builder)=>{
        builder
          .addCase(fetchUsers.fulfilled, (state, action) => {
            state.data = action.payload;
          })
          .addCase(addUser.fulfilled, (state, action) => {
            state.data.push(action.payload);
          })
          .addCase(updateUser.fulfilled, (state, action) => {
            const update_user = action.payload;
            let index = state.data.findIndex(item => item.id = update_user.id)
            if (index) {
              state.data[index] = update_user;
            }
          })
          .addCase(userDeleted.fulfilled, (state, action) => {
            state.data.filter(item => item.id !== action.id);
          })
    }
})
export const getAllUsers =(state)=>state?.users?.data
export default UsersSlice.reducer