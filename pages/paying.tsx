import React, { FC } from "react";
import styles from "../styles/paying/Paying.module.scss"
import { Button, Popconfirm } from "antd";
import { useRouter } from "next/router";
import { openNotification } from "@/components/ui/Notification";
import axios from "axios";
import Cookies from "js-cookie";

const Paying:FC = () => {
    const router = useRouter()

    const payOrder = async (data:any) => {
        try {
            const res = await axios.put(`http://localhost:3000/api/orders/${ Cookies.get("OrderId") }`, data)
            openNotification({type: "success", message: "Заказ успешно создан", duration: 2})
            router.push("/")
            return res
        } catch {
            openNotification({type: "warning", message: "Что-то пошло не так, повторите попытку позже", duration: 2})
        }
    }

    return (
        <div className={ styles.main }>
            <div className={ styles.content }>
                <h1 className={ styles.title }>Реквизиты для оплаты заказа:</h1>
                <h2 className={ styles.card }>Номер карты: 4276 3000 2482 2945</h2>
                <Popconfirm
                    title="Вы оплатили?"
                    description="После закрытия окна, вы не сможете оплатить заказ"
                    onConfirm={() => payOrder({ status: "Создан" })}
                    okText="Да"
                    cancelText="Нет">
                    <Button 
                        type="primary">
                        Оплачено
                    </Button>
                </Popconfirm>
            </div>
        </div>
    )
}

export default Paying