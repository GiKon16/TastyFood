import { Button, Input, Radio, RadioChangeEvent, Select, Space } from "antd";
import uiStyles from "../styles/ui/UI.module.scss";
import styles from "../styles/checkout/Checkout.module.scss";
import Image from "next/image";
import React, { FC, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { TRootState } from "@/redux/store";
import axios from "axios";
import { reset } from "@/redux/CartSlice/CartSlice";
import router, { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { openNotification } from "@/components/ui/Notification";
import Cookies from "js-cookie";

interface ProfileProps {
    user: {
        _id: string,
        name: string,
        phone: string,
    }
}

const OrderCreating:FC<ProfileProps> = ({ user }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const cart = useSelector((state: TRootState) => state.cart)
    const [name, setName] = useState<string>(user.name)
    const [phone, setPhone] = useState<string>(user.phone)
    const [street, setStreet] = useState<string>()
    const [houseNumber, setHouseNumber] = useState<string>()
    const [entrance, setEntrance] = useState<string>()
    const [floor, setFloor] = useState<string>()
    const [appartment, setAppartment] = useState<string>()
    const [time, setTime] = useState<string>('10:00')
    const [payment, setPayment] = useState<string>("Онлайн перевод")

    const changeName = (e: React.ChangeEvent<HTMLInputElement>) => { setName(e.target.value) }

    const changePhone = (e: React.ChangeEvent<HTMLInputElement>) => { setPhone(e.target.value) }

    const changeStreet = (e: React.ChangeEvent<HTMLInputElement>) => { setStreet(e.target.value) }

    const changeHouseNumber = (e: React.ChangeEvent<HTMLInputElement>) => { setHouseNumber(e.target.value) }

    const changeEntrance = (e: React.ChangeEvent<HTMLInputElement>) => { setEntrance(e.target.value) }

    const changeFloor = (e: React.ChangeEvent<HTMLInputElement>) => { setFloor(e.target.value) }

    const changeAppartment = (e: React.ChangeEvent<HTMLInputElement>) => { setAppartment(e.target.value) }

    const changeTime = (value: string) => { setTime(value) }

    const changePayment = (e: RadioChangeEvent) => { setPayment(e.target.value) }

    const createOrder = async (data: any) => {
        try {
            const res = await axios.post("http://localhost:3000/api/orders", data);
            if (payment === "Наличными") {
                if (res.status === 201) {
                    router.push("/").then(() => {
                        if (payment === "Наличными") { dispatch(reset()) }
                    })
                    openNotification({type: "success", message: "Заказ успешно создан", duration: 2})
                    return res
                }
            } else {
                Cookies.set("OrderId", res.data._id)
                router.push("/paying").then(() => dispatch(reset()))
                openNotification({type: "warning", message: "Для создания заказа оплатите по реквизитам", duration: 2})
                return res
            }
        } catch (err) {
            openNotification({type: "warning", message: "Для оформления заказа необходимо заполнить все поля", duration: 2})
            console.log(err);
        }
    }

    return (
        <main className={ styles.main }>
            <div className={ styles.content }>
                <div className={ styles.title }>
                    <Image 
                        src="/images/logo.svg" 
                        alt=""
                        width={60}
                        height={60}/>
                    <h1 className={ styles.name }>TastyFood</h1>
                </div>
                <h1>Оформление заказа</h1>
                <div className={ styles.inputs }>
                    <h2>Данные для доставки</h2>
                    <Input
                        id="name" 
                        value={ name }
                        onChange={ changeName }
                        className={ uiStyles.input } 
                        placeholder="Имя"/>
                    <Input
                        id="phone"
                        value={ phone }
                        onChange={ changePhone } 
                        className={ uiStyles.input } 
                        placeholder="Телефон"/>
                    <div className={ styles.address }>
                        <Input
                            id="street"
                            value={ street }
                            onChange={ changeStreet } 
                            className={ uiStyles["address-input"] } 
                            placeholder="Улица"/>
                        <Input
                            id="housenum"
                            value={ houseNumber }
                            onChange={ changeHouseNumber } 
                            className={ uiStyles["address-input"] } 
                            placeholder="Номер дома"/>
                        <Input
                            id="entrance"
                            value={ entrance }
                            onChange={ changeEntrance } 
                            className={ uiStyles["address-input"] } 
                            placeholder="Подъезд"/>
                        <Input
                            id="floor"
                            value={ floor }
                            onChange={ changeFloor } 
                            className={ uiStyles["address-input"] } 
                            placeholder="Этаж"/>
                        <Input
                            id="apps"
                            value={ appartment }
                            onChange={ changeAppartment } 
                            className={ uiStyles["address-input"] } 
                            placeholder="Квартира"/>
                    </div>
                    <Select
                        id="time"
                        value={ time }
                        onChange={ changeTime } 
                        className={ uiStyles.select } 
                        placeholder="Время доставки"
                        allowClear
                        options={[
                            { value: '10:00', label: '10:00' },
                            { value: '11:00', label: '11:00' },
                            { value: '12:00', label: '12:00' },
                            { value: '13:00', label: '13:00' },
                            { value: '14:00', label: '14:00' },
                            { value: '15:00', label: '15:00' },
                        ]}/>
                </div>
                <div className={ styles.paying }>
                    <h2 id="sss">Способ оплаты</h2>
                    <Radio.Group
                        id="payment"
                        value={ payment }
                        onChange={ changePayment } 
                        className={ styles.methods }>
                        <Space direction="vertical">
                            <Radio value="Наличными">Наличные (при получении)</Radio>
                            <Radio value="Онлайн перевод">Картой (на сайте)</Radio>
                        </Space>
                    </Radio.Group>
                    <Button
                        id="createOrder"
                        onClick={ () => createOrder({
                            customerId: Cookies.get("UserId"),
                            address: {
                                street: street,
                                houseNumber: houseNumber,
                                entrance: entrance,
                                floor: floor,
                                apartment: appartment,
                            },
                            orderTime: time,
                            paymentMethod: payment,
                            products: cart.cartItems!,
                            quantity: cart.quantity,
                            total: cart.total,
                            status: payment === "Наличными" ? "Создан" : "В оплате"
                        }) }
                        className={ uiStyles.button } 
                        type="primary">
                            Оплатить { cart.total }руб.
                        </Button>
                    <Link
                        href="/">
                        <Button 
                            className={ uiStyles.button } >
                            Назад в корзину
                        </Button>
                    </Link>
                </div>
            </div>          
        </main>
    )
}

export default OrderCreating

export const getServerSideProps = async (context:any) => {
    const userId = context.req.cookies.UserId
    const res = await axios.get(`http://localhost:3000/api/users/${ userId }`)
    return {
        props: {
            user: res.data,
        },
    }
}
