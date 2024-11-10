import React, { useState } from 'react';
import { User } from '../../entities/User'; // Asegúrate de que tu interfaz User esté en este archivo
import './form.css'

interface UserFormProps {
    user?: User; // Si se proporciona un usuario, se está editando
    onSubmit: (user: User) => void; // Callback para enviar los datos del formulario
}

const UserForm: React.FC<UserFormProps> = ({ user, onSubmit }) => {

    const [firstName, setFirstName] = useState(user?.firstName || '');
    const [lastName, setLastName] = useState(user?.lastName || '');
    const [email, setEmail] = useState(user?.email || '');
    const [description, setDescription] = useState(user?.description || '');

    const handleSubmit = (e: React.FormEvent) => {
        debugger;
        e.preventDefault();
        const newUser: User = {
            id: user?.id || Date.now().toString(), // Genera un ID único si es un nuevo usuario
            firstName,
            lastName,
            email,
            description
        };
        onSubmit(newUser);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nombre:
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
            </label>
            <label>
                Apellido:
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
            </label>
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>
            <label>
                Descripción:
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Guardar</button>
        </form>
    );
};

export default UserForm;