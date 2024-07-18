import * as React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, IconButton, Avatar, ListItemAvatar, ListItemText, Divider} from '@mui/material';

export const ListOfUsers = () => {
    const [newUser, setNewUser] = useState({
        name: '',
        secondName: '',
        address: '',
        email: '',
        phoneNumber: '',
        photo: '',
    });
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', newUser.name);
        formData.append('secondName', newUser.secondName);
        formData.append('address', newUser.address);
        formData.append('email', newUser.email);
        formData.append('phoneNumber', newUser.phoneNumber);
        formData.append('photo', newUser.photo);

        axios.post("http://localhost:3001/users", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(() => {
                alert("Новый пользователь добавлен в список");
                setVisible(false);
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleChange = (e) => {
        setNewUser({...newUser, [e.target.name]: e.target.value});
    };

    const handlePhoto = (e) => {
        setNewUser({...newUser, photo: e.target.files[0]});
    }

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

    const inputArr = [
        {"placeholder": "Имя", "name": "name", "value": newUser.name},
        {"placeholder": "Фамилия", "name": "secondName", "value": newUser.secondName},
        {"placeholder": "Адрес", "name": "address", "value": newUser.address},
        {"placeholder": "Почта", "name": "email", "value": newUser.email},
        {"placeholder": "Номер телефона", "name": "phoneNumber", "value": newUser.phoneNumber},
    ]

    return (
        <div className='container'>
            <div className='component'>
                {visible && 
                <div className='form-container'>
                    <div className='form-header'>
                        <h3>Добавление нового пользователя</h3>
                        <IconButton onClick={() => setVisible(false)} type="button">X</IconButton>
                    </div>
                    <form onSubmit={handleSubmit} encType='multipart/form-data' className='form'>
                        {inputArr.map((input) => (
                            <input
                                className='form-item'
                                type='text'
                                placeholder={input.placeholder}
                                name={input.name}
                                value={input.value}
                                onChange={handleChange}
                            />
                        ))}
                        <input
                            type="file"
                            accept='.png, .jpg, .jpeg'
                            name="photo"
                            onChange={handlePhoto}
                        />
                        <Button className='btn' variant="contained" type='submit'>Создать</Button>
                    </form>
                </div>
                }
                <Button type='button' onClick={handleAdd} variant="outlined">+ Добавить пользователя</Button>
                    <div className='list'>
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