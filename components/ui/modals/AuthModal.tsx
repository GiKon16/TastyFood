import { Button, Input } from "antd";
import uiStyles from "../../../styles/ui/UI.module.scss";
import React, { FC, useState } from "react";
import Modal from "./Modal";
import axios from "axios";
import { openNotification } from "../Notification";
import Cookies from 'js-cookie';

interface AuthModalProps {
    authOpen: boolean,
    setAuthOpen: (visible: boolean) => void
    openRegModal: () => void
}

const AuthModal:FC<AuthModalProps> = ({ authOpen, setAuthOpen, openRegModal }) => {
    const [login, setLogin] = useState<string>()
    const [password, setPassword] = useState<string>()

    const changeLogin = (e: React.ChangeEvent<HTMLInputElement>) => { setLogin(e.target.value) }
    const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value) }

    const authUser = async (data: any) => {
        try {
            const res = await axios.post("http://localhost:3000/api/users/login", data);
            Cookies.set("UserId", res.data.user._id)
            Cookies.set("ACCESS_TOKEN", res.data.user.token)
            setAuthOpen(false)
            openNotification({type: "success", message: "Авторизация прошла успешно", duration: 2})
            return true
        } catch (err) {
            console.log(err);
            openNotification({type: "warning", message: "Неверный логин или пароль", duration: 2})
            return false
        }
    };
    
    return (
        <Modal visible={ authOpen } setVisible={ setAuthOpen }>
            <h1>Авторизация</h1>
            <Input
                id="login"
                value={ login }
                onChange={ changeLogin } 
                className={ uiStyles.input } 
                placeholder="Логин"/>
            <Input.Password
                id="password"
                value={ password }
                onChange={ changePassword }
                className={ uiStyles.password } 
                placeholder="Пароль"/>
            <Button
                onClick={() => authUser({
                    login: login,
                    password: password,
                })}
                id="signIn"
                className={ uiStyles.button } 
                type="primary">Войти</Button>
            <Button
                onClick={() => openRegModal()}
                className={ uiStyles.button }>
                Регистрация
            </Button>
        </Modal>
    )
}

export default AuthModal