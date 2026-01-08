import {createSlice , PayloadAction} from '@reduxjs/toolkit';
import { User } from '../../data/typeData';

interface UserState {
  currentUser: User | null;
  allUsers: User[];
}
const initialState : UserState={
  currentUser: { name: 'Admin User', role: 'admin', email: 'michaelnadrasana@gmail.com', id: 1 },
  allUsers: [],
}
const userSlice = createSlice({
  name:"user",
  initialState,
  reducers:{
    setCurrentUser(state, action: PayloadAction<User |null>){
      state.currentUser= action.payload;
    },
    setAllUsers(state, action: PayloadAction<User[]>){
      state.allUsers= action.payload;
    }
  }
});
export const {setCurrentUser,setAllUsers}= userSlice.actions;
export default userSlice.reducer;