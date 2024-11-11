import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


interface DialogProps {
    saveUser: () => void;
    children: React.ReactNode;
 }

const FormDialog: React.FC<DialogProps> = ({ children, saveUser }) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSaveUser = () => {
        saveUser();
        handleClose();
    }

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add User
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText>
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSaveUser}>Save</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default FormDialog;