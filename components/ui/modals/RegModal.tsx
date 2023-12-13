import { Button, Input } from "antd";
import uiStyles from "../../../styles/ui/UI.module.scss";
import React, { FC, useState } from "react";
import Modal from "./Modal";
import axios from "axios";
import { reset } from "@/redux/CartSlice/CartSlice";
import { openNotification } from "../Notification";

interface RegModalProps {
    regOpen: boolean,
    setRegOpen: (visible: boolean) => void
    openAuthModal: () => void
}

const RegModal:FC<RegModalProps> = ({ regOpen, setRegOpen, openAuthModal }) => {
    const [name, setName] = useState<string>()
    const [login, setLogin] = useState<string>()
    const [password, setPassword] = useState<string>()

    const changeName = (e: React.ChangeEvent<HTMLInputElement>) => { setName(e.target.value) }
    const changeLogin = (e: React.ChangeEvent<HTMLInputElement>) => { setLogin(e.target.value) }
    const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value) }

    const regUser = async (data: any) => {
        try {   
            if (!login || !password) {
                openNotification({type: "warning", message: "Заполните все поля!", duration: 2})
            }
            else if (!password?.match(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,20}$/)){
                openNotification({type: "warning", message: "Пароль должен иметь длину от 6 до 20 символов, а также иметь буквы, цифры и спец.символы", duration: 2}) 
            }
            else {
                await axios.post("http://localhost:3000/api/users/reg", data)
                openNotification({type: "success", message: "Регистрация прошла успешно", duration: 5})
            }
        } catch (err) {
            console.log(err)
            openNotification({type: "warning", message: "Регистрация не прошла успешно", duration: 2})
        }
    };
    
    return (
        <Modal visible={ regOpen } setVisible={ setRegOpen }>
            <h1>Регистрация</h1>
            <Input
                value={ name }
                onChange={ changeName } 
                className={ uiStyles.input } 
                placeholder="Имя"/>
            <Input 
                value={ login }
                onChange={ changeLogin }
                className={ uiStyles.input } 
                placeholder="Логин"/>
            <Input.Password
                value={ password }
                onChange={ changePassword }
                className={ uiStyles.password } 
                placeholder="Пароль"/>
            <Button
                onClick={() => regUser({
                    name: name,
                    email: "",
                    phone: "",
                    login: login,
                    password: password,
                })}
                className={ uiStyles.button }
                type="primary">
                Регистрация
            </Button>
            <p>Есть аккаунт? Войдите</p>
            <Button
                onClick={() => openAuthModal()}
                className={ uiStyles.button } >
                Войти
            </Button>
        </Modal>
    )
}

export default RegModal
