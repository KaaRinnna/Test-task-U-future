import * as React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import {CreateForm} from "./CreateForm.js";
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

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

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("http://localhost:3001/users", data);
            alert("Новый пользователь добавлен в список");
            setUsers([response.data, ...users]);
            setVisible(false);
        } catch (err) {
            console.error(err);
        }
    }

    const handleAdd = () => {
        setVisible(true);
    }

    const deleteUser = async (id) => {
        console.log(id)
        try {
            await axios.delete(`http://localhost:3001/users/${id}`);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='container'>
            <div className='component'>
                {visible && 
                    <CreateForm
                        onSubmit={onSubmit}
                        setVisible={setVisible}
                    />}
                <Button type='button' onClick={handleAdd} variant="outlined">+ Добавить пользователя</Button>
                    <div className='list'>
                        {users.map((user) => (
                            <div key={user._id}>
                                <ListItemAvatar>
                                    <Avatar src="../static/default-avatar.jpg" />
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