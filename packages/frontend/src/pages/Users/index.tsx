import UserForm from '../../components/User/form';
import UserList from '../../components/User/list';
import { User } from '../../entities/User';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, deleteUser } from '../../redux/userSlice';
import { RootState } from '../../redux/store';


const UserIndex = () => {
  const users = useSelector((state: RootState) => state.users.users);

  const dispatch = useDispatch();

  const handleUserSubmit = (user: User) => {
    dispatch(addUser(user));
  };

  const handleDeleteUser = (userId: string) => {
    dispatch(deleteUser(userId));
  };

  return (
    <div>
      <UserForm onSubmit={handleUserSubmit} />
      <UserList users={users} onDelete={handleDeleteUser}/>
    </div>
  );
};

export default UserIndex