import React, { FC, useState } from "react";
import styles from "../../styles/header/Cart.module.scss";
import uiStyles from "../../styles/ui/UI.module.scss";
import CartButton from "../ui/CartButton";
import { Button } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons"
import CartItem from "./CartItem";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { TRootState } from "@/redux/store";
import { userInfo } from "os";
import { useRouter } from "next/router";
import { openNotification } from "../ui/Notification";
import Cookies from "js-cookie";

interface CartProps {
    type?: string,
}

const Cart:FC<CartProps> = ({ type }) => {
    const router = useRouter()
    const [open, setOpen] = useState<boolean>(false)
    const cart = useSelector((state: TRootState) => state.cart)

    const createOrder = () => {
        if (!Cookies.get("ACCESS_TOKEN")) { 
            return openNotification({type: "warning", message: "Для создания заказа необходимо авторизоваться в системе", duration: 2}) 
        }
        router.push("/checkout")
    }

    return (
        <>
            <CartButton
                type={ type }
                open={ open }
                setOpen={ setOpen }/>
            <div className={ !open ? styles["cart"] : `${ styles["cart"] } ${ styles.slide }`}>
                <div className={ styles.content }>
                    <Button
                        onClick={ () => setOpen(false) }
                        icon={ <CloseCircleOutlined/> }
                        className={ `${ uiStyles.close } ${ styles.close }` }></Button>
                    {
                        cart.cartItems.length === 0
                        ?
                        <div className={ styles.empty }>
                            <h1>Корзина пуста</h1>
                            <p className={ styles.text }>Закиньте сюда вкусняшек, чтобы получить удовольствие ^_^</p>
                        </div>
                        :
                        <>
                            <div className={styles.items}>
                                {
                                    cart.cartItems.map(item => <CartItem cartItem={item} />
                                )}
                            </div>
                            <div className={styles.paying}>
                                <div className={styles['paying-content']}>
                                    <h1>Итого: {cart.total}р.</h1>
                                    <Button
                                            id="createOrder"
                                            onClick={() => createOrder()}
                                            className={uiStyles.button}
                                            type="primary">
                                            Оформить заказ
                                        </Button>
                                </div>
                            </div>
                        </>
                    }
                </div> 
            </div>
        </>
    )
}

export default Cart