import React from 'react';
import { User } from '../../entities/User'; // Importar la interfaz User

interface UserListProps {
    users: User[]; 
    onDelete: (userId: string) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onDelete}) => {
    const handleDelete = (e: React.FormEvent, user: User) => {
        e.preventDefault();
        onDelete(user.id);
    };
    return (
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Email</th>
                    <th>Descripción</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.description}</td>
                        <td>
                            <button onClick={ e => handleDelete(e, user)}>
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UserList;