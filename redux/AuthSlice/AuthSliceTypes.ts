export interface AuthSliceTypes{ 
    token: string | null 
    _id: string | null
    userInfo: {
        _id: string,
        name: string,
        login: string,
        password: string,
        createdAt: string,
        updatedAt: string,
        __v: number,
        token: string,
    } | null
}

export type IRequestUserInfo = {
    _id?: string,
}