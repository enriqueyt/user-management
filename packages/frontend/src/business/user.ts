import { getAllUsers as getAllUsersApi } from '../api/user';
import { useDispatch } from 'react-redux';
import { setUserList } from '../redux/userSlice'

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

    return {
        business: { getAllUsers },
    }
}

export default UserBusinessLogic;