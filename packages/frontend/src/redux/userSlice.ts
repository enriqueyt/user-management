import { createSlice } from '@reduxjs/toolkit';
import { User } from '../entities/User'; // Assuming User interface is defined in a separate file

interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [],
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    // Add other reducers for update and fetch operations
  },
});

export const { addUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;