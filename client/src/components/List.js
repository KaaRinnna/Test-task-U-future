import * as React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Avatar, ListItemAvatar, ListItemText, Divider} from '@mui/material';
import { CreateForm } from './CreateForm';

export const ListOfUsers = () => {
    const [users, setUsers] = useState([]);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:3001/users");
                setUsers(response.data);
            } catch (err) {
                console.error(err);
            }
        }
        fetchUsers();
    }, []);

    const handleAdd = () => {
        setVisible(true);
    };

    const deleteUser = async (id) => {
        console.log(id)
        try {
            await axios.delete(`http://localhost:3001/users/${id}`);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='container'>
            <div className='component'>
                {visible && 
                    <CreateForm setVisible={setVisible} />
                }
                
                    <div className='list'>
                    <Button type='button' onClick={handleAdd} variant="outlined">+ Добавить пользователя</Button>
                        {users.map((user) => (
                            <div key={user._id}>
                                <ListItemAvatar>
                                    <Avatar src={`http://localhost:3001/images/${user.photo}`} />
                                </ListItemAvatar>
                                <h2>{user.name} {user.secondName}</h2>
                                <div className='info'>
                                    <ListItemText>{user.email}</ListItemText>
                                    <ListItemText>{user.address}</ListItemText>
                                    <ListItemText>{user.phoneNumber}</ListItemText>
                                    <Button onClick={() => deleteUser(user._id)} type="button" variant="outlined" color="error">
                                        Удалить
                                    </Button>
                                </div>
                                <Divider style={{ marginBottom: 10, marginTop: 10}}  variant="fullWidth" />
                            </div>))}
                    </div>
            </div>
        </div>
    )
}