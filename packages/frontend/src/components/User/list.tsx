import React from 'react';
import { User } from '../../entities/User';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';

interface UserListProps {
    users: User[];
    onDelete: (userId: string) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onDelete }) => {

    const columns: GridColDef[] = [
        { field: 'firstName', headerName: 'First name', width: 150 },
        { field: 'lastName', headerName: 'Last name', width: 150 },
        { field: 'gender', headerName: 'gender', width: 100 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params: GridRenderCellParams<User>) => {
                const user = params.row;
                return (
                    <>
                        <Tooltip title={user.description}>
                            <span>Read More</span>
                        </Tooltip>
                        <button onClick={() => { onDelete(user.id!); }}>
                            Edit
                        </button>
                    </>
                );
            },
        }
    ];

    const paginationModel = { page: 0, pageSize: 3 };

    return (
        <Paper sx={{ height: 265, width: '700px' }}>
            <DataGrid
                rows={users}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                sx={{ border: 0 }}
            />
        </Paper>
    );
};

export default UserList;