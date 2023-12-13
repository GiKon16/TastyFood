import React, { FC, useEffect, useState } from "react";
import styles from "../../styles/profile/Profile.module.scss";
import uiStyles from "../../styles/ui/UI.module.scss";
import Layout from "@/components/Layout";
import { Button, Input } from "antd";
import OrderItem from "@/components/orders/OrderItem";
import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import Cookies from "js-cookie";
import { openNotification } from "@/components/ui/Notification";

interface ProfileProps {
    user: {
        _id: string,
        name: string,
        phone: string,
    },
    orders: {
        _id: string,
        createdAt: string,
        total: string,
        status: string,
    }[]
}

const Profile:FC<ProfileProps> = ({ user, orders }) => {
    const router = useRouter()
    const [name, setName] = useState<string>(user.name)
    const [phone, setPhone] = useState<string>(user.phone)

    const changeName = (e: React.ChangeEvent<HTMLInputElement>) => { setName(e.target.value) }
    const changePhone = (e: React.ChangeEvent<HTMLInputElement>) => { setPhone(e.target.value) }

    const saveProfile = async (data: any) => {
        try {
            if (!name) {
                return openNotification({type: "warning", message: "Имя не может быть пустым", duration: 2})
            }
            if (!phone) {
                return openNotification({type: "warning", message: "Телефон не может быть пустым", duration: 2})
            }
            openNotification({type: "success", message: "Изменения успешно сохранены", duration: 2})
            return await axios.put("http://localhost:3000/api/users/646e093d0c719128f77508d2", data)
        } catch (err) {
            console.log(err);
        }
    }

    const exit = () => {
        router.push("/")
        Cookies.remove("UserId")
        Cookies.remove("ACCESS_TOKEN")
    }

    return (
        <Layout>
            <Head>
                <title>Профиль</title>
                <meta name="description" content="TastyFood - самая вкусная пицца ^_^" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/icons/tasty-food-icon.ico" />
            </Head>
            <main className={ styles.main }>
                <div className={ styles.content }>
                    <div className={ styles.info }>
                        <h2>Личные данные</h2>
                        <Input
                            value={ name } 
                            onChange={ changeName }
                            className={ uiStyles.input } 
                            placeholder="Имя"/>
                        <Input
                            value={ phone } 
                            onChange={ changePhone }
                            className={ uiStyles.input } 
                            placeholder="Телефон"/>
                        <Button
                            onClick={() => saveProfile({
                                name: name,
                                phone: phone,
                            })} 
                            type="primary" 
                            className={ uiStyles.button }>
                            Сохранить
                        </Button>
                    </div>
                    <div className={ styles.orders }>
                        <h2>Заказы</h2>
                        <div className={ styles.items }>
                            {
                                orders.map(order => 
                                    <OrderItem order={ order }/>    
                                )
                            }
                        </div>
                    </div>
                    <Button
                        onClick={() => exit()} 
                        type="primary" 
                        className={ uiStyles.button }>
                        Выйти
                    </Button>
                </div>
            </main>
        </Layout>
    )
}

export default Profile

export const getServerSideProps = async (context:any) => {
    const userId = context.req.cookies.UserId
    const resUser = await axios.get(`http://localhost:3000/api/users/${ userId }`)
    const resOrders = await axios.get(`http://localhost:3000/api/orders/customers/${ userId }`)
    return {
        props: {
            user: resUser.data,
            orders: resOrders.data,
        },
    }
}
