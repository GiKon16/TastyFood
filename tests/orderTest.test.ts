import axios from "axios";
import { expect, test } from '@jest/globals';

const createOrder = async (data: any) => {
    try {
        const res = await axios.post("http://localhost:3000/api/orders", data);
        if (res.status === 201) {
            return "done"
        } else {
            return "Authentication failed"
        }
    } catch (err) {
        throw new Error("Order creating failed")
    }
}

describe('Создание заказа', () => {
    test('Создание заказа с корректными данными', async () => {
        const result = await createOrder({ 
            customer: {
                _id: "646e093d0c719128f77508d2",
                name: "Амин",
                phone: "89999999999",
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
            products: [
                {
                    _id: "645e77d10d037c6e2e3c9b83",
                    name: "Десерт №3",
                    productQuantity: 1,
                    productPrice: 189,
                    generalPrice: 378,
                    unit: "см.",
                    img: "/images/cake.svg"
                },
            ],
            quantity: 1,
            total: 189,
            status: "Создан",
        })
        expect(result).toBe('done')
    })
  
    test('Создание заказа с некорретными данными', async () => {
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
