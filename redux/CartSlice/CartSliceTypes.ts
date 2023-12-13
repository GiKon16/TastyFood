export type CartSliceTypes = {
    cartItems: {
        _id: string,
        name: string,
        productQuantity: number,
        productPrice: number,
        generalPrice: number,
        size: number,
        unit: string,
        img: string,
    }[],
    quantity: number,
    total: number,
}