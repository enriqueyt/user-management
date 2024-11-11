import UserForm from '../../components/User/form';
import UserList from '../../components/User/list';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser } from '../../redux/userSlice';
import { RootState } from '../../redux/store';
import { useEffect } from 'react';
import userBusinessLogic from '../../business/user'

const UserIndex = () => {
  const users = useSelector((state: RootState) => state.users.users);
  const { business } = userBusinessLogic();

  const handleDeleteUser = (userId: string) => {
    business.deleteUser(userId);
  };

  useEffect(() => {
    business.getAllUsers();
  }, []);

  return (
    <div>
      <UserForm />
      <UserList onDelete={handleDeleteUser} users={users} />
    </div>
  );
};

export default UserIndex