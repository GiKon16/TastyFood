import React, { FC } from "react";
import styles from "../../styles/orders/OrderItem.module.scss";
import uiStyles from "../../styles/ui/UI.module.scss";
import { Button } from "antd";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import dayjs from "dayjs";

interface OrderItemProps {
    order: {
        _id: string,
        createdAt: string,
        total: string,
        status: string,
    }
}

const OrderItem:FC<OrderItemProps> = ({ order }) => {
    const router = useRouter()

    const openOrder = () => {
        Cookies.set("OrderId", order._id)
        router.push(`profile/orders/${ order._id }`)
    }

    return (
        <div className={ styles.item }>
            <div className={ styles.date }>
                Дата: { dayjs(order.createdAt).format("DD-MM-YYYY") }
            </div>
            <div className={ styles.cost }>
                Итог: { order.total }р.
            </div>
            <div className={ styles.status }>
                { order.status }
            </div>
            <Button 
                onClick={() => {
                    openOrder()
                }}
                ghost 
                className={ uiStyles.button }>
                Подробнее
            </Button>
        </div>
    )
}

export default OrderItem