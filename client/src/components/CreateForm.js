import { useState } from "react";
import axios from "axios";
import { Button, IconButton} from '@mui/material';

export const CreateForm = ({setVisible}) => {
    const [newUser, setNewUser] = useState({
        name: '',
        secondName: '',
        address: '',
        email: '',
        phoneNumber: '',
        photo: '',
    });

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
    };

    const inputArr = [
        {"placeholder": "Имя", "name": "name", "value": newUser.name},
        {"placeholder": "Фамилия", "name": "secondName", "value": newUser.secondName},
        {"placeholder": "Адрес", "name": "address", "value": newUser.address},
        {"placeholder": "Почта", "name": "email", "value": newUser.email},
        {"placeholder": "Номер телефона", "name": "phoneNumber", "value": newUser.phoneNumber},
    ];

    return (
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
                    key={input.name}
                    placeholder={input.placeholder}
                    name={input.name}
                    value={input.value}
                    onChange={handleChange}
                />
                ))}
                <input
                    className="file"
                    type="file"
                    accept='.png, .jpg, .jpeg'
                    name="photo"
                    onChange={handlePhoto}
                />
                <Button className='btn' variant="contained" type='submit'>Создать</Button>
            </form>
        </div>
    )
}