import React, { FC } from "react";
import styles from "../../styles/header/Header.module.scss";
import uiStyles from "../../styles/ui/UI.module.scss";
import Image from "next/image";
import Enter from "./Enter";
import BurgerNavBar from "./BurgerNavBar";
import Link from "next/link";
import Cart from "./Cart";

const Header:FC = () => {
    return (
        <>
            <header className={styles.header}>
                <div className={ styles.phone }>
                    <Image
                        src="/images/phone.svg"
                        alt=""
                        width={40}
                        height={40}/>
                    <div className={ styles.description }>
                        <h3>+7 999 999 99 99</h3>
                        <p>Звоните не стесняйтесь)</p>
                    </div>
                </div>
                <div className={ styles.title }>
                    <Image 
                        src="/images/logo.svg" 
                        alt=""
                        width={60}
                        height={60}/>
                    <h1 className={ styles.name }>TastyFood</h1>
                </div>
                <Enter />
                <BurgerNavBar/>
            </header>
            <nav className={ styles.navbar }>
                <Link className={ styles.link } href="/#pizza">Пицца</Link>
                <Link className={ styles.link } href="/#cakes">Десерты</Link>
                <Link className={ styles.link } href="/#drinks">Напитки</Link>
                <Link className={ `${ styles.link } ${ styles.hidden }` } href="/about">О нас</Link>
                <Link className={ `${ styles.link } ${ styles.hidden }` } href="#news">Новости</Link>
                <Cart type="nav"/>
            </nav>
        </>
    )
}

export default Header