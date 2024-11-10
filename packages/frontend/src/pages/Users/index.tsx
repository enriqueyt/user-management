import UserForm from '../../components/User/form';
import UserList from '../../components/User/list';
import { defaultUser, User } from '../../entities/User';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, deleteUser } from '../../redux/userSlice';
import { RootState } from '../../redux/store';
import { useEffect, useState } from 'react';
import userBusinessLogic from '../../business/user'

const UserIndex = () => {
  const users = useSelector((state: RootState) => state.users.users);
  const { business } = userBusinessLogic();
  const [user, setUser] = useState(defaultUser);

  const dispatch = useDispatch();

  const handleUserSubmit = (user: User) => {
    dispatch(addUser(user));
  };

  const handleDeleteUser = (userId: string) => {
    dispatch(deleteUser(userId));
  };

  useEffect(() => {
    business.getAllUsers();
  }, []);

  return (
    <div>
      <UserForm onSubmit={handleUserSubmit} user={user} />
      <UserList onDelete={handleDeleteUser} users={users} />
    </div>
  );
};

export default UserIndex