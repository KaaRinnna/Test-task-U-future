import * as yup from "yup";
import {useForm, Controller} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

export const CreateForm = ({onSubmit, setVisible, handlePhoto}) => {
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
        <h1>moved</h1>
    )
}