import React, { FC, useEffect, useState } from "react";
import styles from "../../styles/header/Enter.module.scss";
import uiStyles from "../../styles/ui/UI.module.scss";
import { Input, Button } from "antd";
import AuthModal from "../ui/modals/AuthModal";
import RegModal from "../ui/modals/RegModal";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const Enter:FC = () => {
    const router = useRouter()
    const [enter, setEnter] = useState<boolean>(false)
    const [authOpen, setAuthOpen] = useState<boolean>(false)
    const [regOpen, setRegOpen] = useState<boolean>(false)
    const [token, setToken] = useState<string | null>()

    useEffect(() => {
        setToken(Cookies.get("ACCESS_TOKEN"))
    })

    const openRegModal = () => {
        setRegOpen(true)
        setAuthOpen(false)
    }

    const openAuthModal = () => {
        setAuthOpen(true)
        setRegOpen(false)
    }

    const openProfile = () => {
        router.push("/profile")
    }

    return (
        <>
            <AuthModal 
                authOpen={ authOpen }
                setAuthOpen={ setAuthOpen }
                openRegModal={ openRegModal }/>
            <RegModal
                regOpen={ regOpen }
                setRegOpen={ setRegOpen }
                openAuthModal={ openAuthModal }/>
            <div className={styles.enter} data-cy="enter">
                {
                    token ?
                    <Button
                        className={ uiStyles.button }
                        type="primary" 
                        onClick={() => openProfile()}>
                        Профиль
                    </Button> :
                    <Button
                        id="enter"
                        className={ uiStyles.button }
                        type="primary" 
                        onClick={() => setAuthOpen(true)}>
                        Войти
                    </Button>
                }
            </div>
        </>
    )
}

export default Enter