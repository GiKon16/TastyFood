import React, { FC } from "react";
import styles from "../../../styles/orders/Order.module.scss";
import uiStyles from "../../../styles/ui/UI.module.scss";
import Image from "next/image";
import { Button, Radio, Space } from "antd";
import Layout from "@/components/Layout";
import OrderProduct from "@/components/orders/OrderProduct";
import Head from "next/head";
import axios from "axios";
import dayjs from "dayjs";

interface OrderProps {
    order: {
        customerId: string,
        address: {
            street: string,
            houseNumber: string,
            entrance: string,
            floor: string,
            apartment: string,
        },
        orderTime: string,
        paymentMethod: string,
        products: {
            _id: string,
            img: string,
            name: string,
            productPrice: number,
            productQuantity: number,
            size: string,
            unit: string,
        }[],
        quantity: string,
        total: number,
        status: string,
        createdAt: string,
    }
}

const Order:FC<OrderProps> = ({ order }) => {   
    return (
        <Layout>
            <Head>
                <title>Заказ</title>
                <meta name="description" content="TastyFood - самая вкусная пицца ^_^" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/icons/tasty-food-icon.ico" />
            </Head>
            <main className={ styles.main }>
                <div className={ styles.content }>
                    <div className={ styles.general }>
                        <h1>Информация о заказе</h1>
                        <div className={ styles.date }>
                            <h2>Дата: { dayjs(order.createdAt).format("DD-MM-YYYY HH:MM") }</h2>
                        </div>
                        <div className={ styles.cost }>
                            <h2>Сумма заказа: { order.total }р.</h2>
                        </div>
                        <div className={ styles.cost }>
                            <h2>Статус заказа: { order.status }</h2>
                        </div>
                    </div>
                    <div className={ styles.comp }>
                        <h1>Состав заказа:</h1>
                        <div className={ styles.items }>
                            {
                                order.products.map(product => 
                                    <OrderProduct product={ product }/>
                                )
                            }
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    )
}

export default Order

export const getServerSideProps = async (context:any) => {
    const orderId = context.req.cookies.OrderId
    const resOrder = await axios.get(`http://localhost:3000/api/orders/${ orderId }`)
    return {
        props: {
            order: resOrder.data
        },
    }
}