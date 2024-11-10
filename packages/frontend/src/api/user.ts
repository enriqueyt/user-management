import { User } from '../entities/User'

export const getAllUsers = async (): Promise<User[]> => {
    try {
        const response = await fetch('http://localhost:3000/user/all', {
            method: 'PUT', // Corrected to GET for fetching data
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        });

        if (!response.ok) {
            throw new Error('Error fetching all users');
        }

        const data = await response.json();
        return data as User[]; // Assuming the API returns an array of User objects
    } catch (error) {
        console.error(error);
        throw error; // Re-throw the error to handle it at a higher level
    }
};