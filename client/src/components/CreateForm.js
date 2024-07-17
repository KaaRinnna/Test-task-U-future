import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import * as yup from "yup";
import {useForm, Controller} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

export const CreateForm = ({onSubmit, setVisible}) => {
    const schema = yup.object().shape({
        name: yup.string().required('Введите имя'),
        secondName: yup.string().required('Введите фамилию'),
        address: yup.string().required('Введите адрес'),
        email: yup.string().required('Введите почту'),
        phoneNumber: yup.string().required('Введите номер телефона'),
    })

    const { handleSubmit, control } = useForm({
        resolver: yupResolver(schema),
    })

    return (
        <div className='form-container'>
            <div className='form-header'>
                <h3>Добавление нового пользователя</h3>
                <IconButton onClick={() => setVisible(false)} type="button">X</IconButton>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='form'>
                <Controller
                    name="name"
                    control={control}
                    defaultValue=''
                    render={({field}) => (
                        <TextField 
                            className='form-item'
                            style={{ marginBottom: 11 }}
                            {...field}
                            label="Имя:" 
                            variant="outlined" />
                    )}
                />
                <Controller
                    name="secondName"
                    control={control}
                    defaultValue=''
                    render={({field}) => (
                        <TextField 
                            style={{ marginBottom: 11 }} 
                            className='form-item' 
                            {...field}
                            label="Фамилия:" 
                            variant="outlined" />
                    )}
                />
                <Controller
                    name="address"
                    control={control}
                    defaultValue=''
                    render={({field}) => (
                        <TextField 
                            style={{ marginBottom: 11 }} 
                            className='form-item' 
                            {...field}
                            label="Адрес:" 
                            variant="outlined" />
                    )}
                />
                <Controller
                    name="email"
                    control={control}
                    defaultValue=''
                    render={({field}) => (
                        <TextField 
                            style={{ marginBottom: 11 }} 
                            className='form-item' 
                            {...field}
                            label="Почта:" 
                            variant="outlined" />
                    )}
                />
                <Controller
                    name="phoneNumber"
                    control={control}
                    defaultValue=''
                    render={({field}) => (
                        <TextField 
                            style={{ marginBottom: 11 }} 
                            className='form-item' 
                            {...field}
                            label="Номер телефона:" 
                            variant="outlined" />
                    )}
                />
                <Button className='btn' variant="contained" type='submit'>Создать</Button>
            </form>
        </div>
    )
}