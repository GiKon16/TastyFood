import React, { FC } from "react";
import styles from "../../styles/footer/Footer.module.scss";
import uiStyles from "../../styles/ui/const first = useRef(second).module.scss";
import Image from "next/image";
import Link from "next/link";
import Cart from "../header/Cart";

const Footer:FC = () => {
    return (
        <>
        <Cart/>
        <footer className={styles.footer}>
                <div className={styles.general}>
                    <div className={styles.title}>
                        <Image
                            src="/images/footer-logo.svg"
                            alt=""
                            width={70}
                            height={70} />
                        <h1>TastyFood</h1>
                    </div>
                    <nav className={styles.navbar}>
                        <Link className={styles.link} href="#">Главная</Link>
                        <Link className={styles.link} href="#">О нас</Link>
                        <Link className={styles.link} href="#">Контакты</Link>
                        <Link className={styles.link} href="#">Новости</Link>
                    </nav>
                    <div className={styles.contacts}>
                        <div className={styles.phone}>
                            <Image
                                src="/images/footer-phone.svg"
                                alt=""
                                width={40}
                                height={40} />
                            <div className={styles.description}>
                                <h3>+7 999 999 99 99</h3>
                                <p>Звоните не стесняйтесь)</p>
                            </div>
                        </div>
                        <div className={styles.address}>
                            <h3>г. Краснодар, ул. Красная 322</h3>
                        </div>
                    </div>
                    <div className={styles.medias}>
                        <Image
                            src="/images/vk.svg"
                            alt=""
                            width={40}
                            height={40} />
                        <Image
                            src="/images/telega.svg"
                            alt=""
                            width={40}
                            height={40} />
                        <Image
                            src="/images/insta.svg"
                            alt=""
                            width={40}
                            height={40} />
                    </div>
                </div>
                <div className={styles.copyright}>
                    <Image
                        src="/images/copyright.svg"
                        alt=""
                        width={20}
                        height={20} />
                    <p>2023 TastyFood. Все права защищены</p>
                </div>
            </footer></>
    )
}

export default Footer