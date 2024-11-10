import React, { useState } from 'react';
import { User, Gender } from '../../entities/User'; // Asegúrate de que tu interfaz User esté en este archivo
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
    const [gender, setGender] = useState<Gender>(Gender.Male);

    const handleSubmit = (event: React.FormEvent) => {
        const newUser: User = {
            id: user?.id || Date.now().toString(), // Genera un ID único si es un nuevo usuario
            firstName,
            lastName,
            gender,
            email,
            description
        };
        onSubmit(newUser);
    };

    const descriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target;
        if (value.length <= 200) {
            setDescription(value);
        } else {
            event.preventDefault();
        }
    };

    return (
        <form>
            <label>
                First Name:
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
            </label>
            <label>
                Last Name:
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
            </label>
            <label>
                Gender:
                <select value={gender} onChange={(e) => setGender(e.target.value as Gender)}>
                    <option value={Gender.Male}>Male</option>
                    <option value={Gender.Female}>Female</option>
                </select>
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
                Description:
                <textarea
                    value={description}
                    onChange={descriptionChange}
                    maxLength={200}
                    required
                />
            </label>
            <button type="button" onClick={handleSubmit}>Guardar</button>
        </form>
    );
};

export default UserForm;