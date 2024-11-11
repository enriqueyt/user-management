import React, { useState } from 'react';
import { User, Gender } from '../../entities/User'; // Asegúrate de que tu interfaz User esté en este archivo
import './form.css'
import userBusinessLogic from '../../business/user'

interface UserFormProps { }

const UserForm: React.FC<UserFormProps> = () => {

    const { business } = userBusinessLogic();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [gender, setGender] = useState<Gender>(Gender.Male);

    const handleSubmit = async (event: React.FormEvent) => {
        const newUser: User = {
            firstName,
            lastName,
            gender,
            email,
            description
        };

        await business.createUser(newUser);

        setFirstName('');
        setLastName('');
        setEmail('');
        setDescription('');
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