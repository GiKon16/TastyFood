import React, { FC, useState } from "react";
import styles from "../../styles/header/CartItem.module.scss";
import Image from "next/image";
import { Button } from "antd";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons"
import { useDispatch } from "react-redux";
import { upProductAmount, downProductAmount, deleteCartItem } from "@/redux/CartSlice/CartSlice";

interface CartItemProps {
    cartItem: {
        _id: string,
        name: string,
        productQuantity: number,
        productPrice: number,
        generalPrice: number,
        size: number,
        unit: string,
        img: string,
    }
}

const CartItem:FC<CartItemProps> = ({ cartItem }) => {
    const dispatch = useDispatch()
    const [price, setPrice] = useState<number>(cartItem.generalPrice)

    const deleteProductFromCart = () => {
        dispatch(deleteCartItem({
            _id: cartItem._id,
            name: cartItem.name,
            productQuantity: cartItem.productQuantity,
            productPrice: cartItem.productPrice,
            generalPrice: cartItem.productPrice * cartItem.productQuantity,
            img: cartItem.img,
        }))
    }
    
    return (
        <div className={ styles.item }>   
            <div className={ styles.left }>
                <Image
                    src={ cartItem.img }
                    alt=""
                    width={60}
                    height={60}/>
                <div className={ styles.name }>
                    <h2>{ cartItem.name }</h2>
                    { cartItem.size ? <h3>{ cartItem.size + " " + cartItem.unit }</h3> : null }
                </div>       
            </div>
            <div className={ styles.right }>
                <div className={ styles.quantity }>
                    <Button icon={ <PlusOutlined /> } onClick={() => dispatch(upProductAmount({_id: cartItem._id, productPrice: cartItem.productPrice}))}/>
                    <h3 className={ styles.amount }>{ cartItem.productQuantity }</h3>
                    <Button
                        disabled={ cartItem.productQuantity === 0 } 
                        icon={ <MinusOutlined /> } 
                        onClick={() => dispatch(downProductAmount({_id: cartItem._id, productPrice: cartItem.productPrice}))}/>
                </div>
                <h2 className={ styles.cost }>{ cartItem.generalPrice }р.</h2>
                <Button
                    onClick={() => deleteProductFromCart()} 
                    icon={ <DeleteOutlined /> }/>
            </div>           
        </div>
    )
}

export default CartItem