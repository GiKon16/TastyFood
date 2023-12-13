import React, { FC } from "react";
import styles from "../../styles/orders/OrderProduct.module.scss"
import Image from "next/image";

interface OrderProductProps {
    product: {
        _id: string,
        img: string,
        name: string,
        productPrice: number,
        productQuantity: number,
        size: string,
        unit: string,
    }
}

const OrderProduct:FC<OrderProductProps> = ({ product }) => {
    return (
        <div className={ styles.item }>   
            <div className={ styles.left }>
                <Image
                    src={ product.img }
                    alt=""
                    width={150}
                    height={150}/>
            </div>
            <div className={ styles.right }>
                <h2 className={ styles.name }>{ product.name }</h2>
                { 
                    product.size ? 
                    <h3 className={ styles.size }>Размер: { product.size } {product.unit}</h3> :
                    null
                }
                <h3 className={ styles.cost }>Стоимость: { product.productPrice }р.</h3>
                <h3 className={ styles.amount }>Кол-во: { product.productQuantity }</h3>
            </div>           
        </div>
    )
}

export default OrderProduct