import axios from "axios";
import { expect, test } from '@jest/globals';

let token: string = "";

export const instanceAxiosClose = () => {
    return axios.create({
        baseURL: "http://localhost:3000/api/",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${ token }`,
        },
    })
}

const authUser = async (data: any) => {
    try {
        const response = await axios.post("http://localhost:3000/api/users/login", data)
        if (response.status === 200) {
            return "done"
        } else {
            return "Authentication failed"
        }
    } catch (err) {
        throw new Error("Authentication failed")
    }
}

const createOrder = async (data: any) => {
    try {
        const res = await axios.post("http://localhost:3000/api/orders", data);
        if (res.status === 201) {
            token = res.data.token
            return "done"
        } else {
            return "Authentication failed"
        }
    } catch (err) {
        throw new Error("Order creating failed")
    }
}

describe('Оформление заказа неавторизованного пользователя', () => {
    it('Авторизация', async () => {
        await expect(authUser({ login: 'Ami', password: '12345' })).rejects.toThrow('Authentication failed')
    })
  
    it('Оформление заказа', async () => {
        await expect(createOrder({ 
            customer: {
                _id: null,
                name: null,
                phone: null,
            },
            address: {
                street: "Красная",
                houseNumber: "1",
                entrance: "1",
                floor: "1",
                apartment: "1",
            },
            orderTime: "10:00",
            paymentMethod: "Онлайн перевод",
            products: null,
            quantity: 0,
            total: 0,
            status: "Создан", }))
                .rejects.toThrow('Order creating failed')
    })
})

