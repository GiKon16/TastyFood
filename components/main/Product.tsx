import React, { FC, useState } from "react";
import styles from "../../styles/main/Product.module.scss";
import uiStyles from "../../styles/ui/UI.module.scss";
import Image from "next/image";
import { Button } from "antd";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { TRootState } from "@/redux/store";
import { addCartItem, upProductAmount } from "@/redux/CartSlice/CartSlice";

interface ProductProps {
    product: {
        _id: string,
        name: string,
        type: string,
        description: string,
        composition: string,
        nutrition: {
            calories: number,
            carbohydrates: number,
            fats: number,
            protein: number,
        }
        img: string,
        prices: {
            price: number,
            size: number,
            weight: number,
        }[],
        units: {
            unitWeight: string,
            unitLength: string,
        },
    }
}

const Product:FC<ProductProps> = ({ product }) => {
    const dispatch = useDispatch()
    const total = useSelector((state: TRootState) => state.cart.total)
    const cart = useSelector((state: TRootState) => state.cart)
    
    const addProductToCart = () => {
        if(!cart.cartItems.some(item => item._id === product._id && item.productPrice === product.prices[0].price)) {
            dispatch(addCartItem({
                _id: product._id,
                name: product.name,
                productQuantity: 1,
                productPrice: product.prices[0].price,
                generalPrice: product.prices[0].price,
                size: product.prices[0].size,
                unit: product.units.unitLength,
                img: product.img,
            }))
        } else {
            dispatch(upProductAmount({_id: product._id, productPrice: product.prices[0].price}))
        }
    }
    return (
        <div className={ styles.product }>
            <Link href={ `/product/${product._id}` }>
                <Image
                    src={ product.img }
                    alt=""
                    width={250}
                    height={250}/>
            </Link>
            <h2 className={ styles.name }>{ product.name }</h2>
            <p className={ styles.description }>
                { product.description }
            </p>
            <div className={ styles.buying }>
                <h3 className={ styles.cost }>{ product.prices[0].price }р.</h3>
                {
                    product.type !== "cake" 
                    ? 
                    <Link href={ `/product/${product._id}` }>
                        <Button 
                            type="primary" 
                            className={ uiStyles.button }>
                            Выбрать
                        </Button>
                    </Link>         
                    : 
                    <Button
                        id="buy"
                        onClick={() => addProductToCart()} 
                        type="primary" 
                        className={ uiStyles.button }>
                        В корзину
                    </Button>
                }             
            </div>
        </div>
    )
}

export default Product

