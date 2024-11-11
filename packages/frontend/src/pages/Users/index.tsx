import DialogUserForm from '../../components/User/dialogUserForm';
import UserList from '../../components/User/list';
import { useSelector } from 'react-redux';
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
      <DialogUserForm />
      <UserList onDelete={handleDeleteUser} users={users} />
    </div>
  );
};

export default UserIndex