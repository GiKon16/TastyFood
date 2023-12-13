import React, { FC, useEffect, useState } from "react";
import styles from "../../styles/header/BurgerNavBar.module.scss";
import uiStyles from "../../styles/ui/UI.module.scss";
import Link from "next/link";
import BurgerButton from "@/components/ui/BurgerButton";
import { Button } from "antd";
import AuthModal from "@/components/ui/modals/AuthModal";
import RegModal from "@/components/ui/modals/RegModal";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const BurgerNavBar:FC = () => {
    const router = useRouter()
    const [open, setOpen] = useState<boolean>(false)
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
            <BurgerButton 
                open={ open }
                setOpen={ setOpen }/>
            <div className={ !open ? styles["burger-navbar"] : `${ styles["burger-navbar"] } ${ styles.slide }`}>
                <div className={ styles.content }>
                    <div className={ styles.title }>
                        <Image 
                            src="/images/logo.svg" 
                            alt=""
                            width={60}
                            height={60}/>
                        <h1 className={ styles.name }>TastyFood</h1>
                    </div>
                    <nav className={ styles.navbar }>
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
                        <Link className={ styles.link } href="#">Главная</Link>
                        <Link className={ styles.link } href="#">О нас</Link>
                        <Link className={ styles.link } href="#">Контакты</Link>
                        <Link className={ styles.link } href="#news">Новости</Link>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default BurgerNavBar