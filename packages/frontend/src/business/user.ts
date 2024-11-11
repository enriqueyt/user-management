import { getAllUsers as getAllUsersApi, createUser as  createUserApi} from '../api/user';
import { useDispatch } from 'react-redux';
import { setUserList } from '../redux/userSlice'
import { User } from '../entities/User';

const UserBusinessLogic = () => {

    const dispatch = useDispatch();

    const getAllUsers = () => {
        getAllUsersApi()
            .then((response) => {
                dispatch(setUserList(response));
            })
            .catch((error) => console.error(error))
            .finally();
    }

    const createUser = async (user: User) => {
        await createUserApi(user)
        getAllUsers();
    }

    return {
        business: { getAllUsers, createUser },
    }
}

export default UserBusinessLogic;