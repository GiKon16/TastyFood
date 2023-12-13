import axios from "axios";
import { expect, test } from '@jest/globals';

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

describe('Авторизация пользователя', () => {
    test('Авторизация с корректными данными', async () => {
        const result = await authUser({ login: 'ami', password: '12345' })
        expect(result).toBe('done')
    })
  
    test('Авторзация с некорректными данными', async () => {
        await expect(authUser({ login: 'Ami', password: '12345' })).rejects.toThrow('Authentication failed')
    })
})
