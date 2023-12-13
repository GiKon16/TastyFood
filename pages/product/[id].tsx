import React, { FC, useState } from "react";
import styles from "../../styles/product/Product.module.scss";
import uiStyles from "../../styles/ui/UI.module.scss";
import Image from "next/image";
import { Button, Radio, RadioChangeEvent, Space } from "antd";
import Layout from "@/components/Layout";
import Head from "next/head";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem, upProductAmount } from "@/redux/CartSlice/CartSlice";
import { TRootState } from "@/redux/store";

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
            unitMain: string,
        },
    }
}

const Product:FC<ProductProps> = ({ product }) => {
    const dispatch = useDispatch()
    const [price, setPrice] = useState<number>(product.prices[0].price)
    const [weight, setWeight] = useState<number>(product.prices[0].weight)
    const [size, setSize] = useState<number>(product.prices[0].size)
    const cart = useSelector((state: TRootState) => state.cart)

    const addProductToCart = () => {
        if(!cart.cartItems.some(item => item._id === product._id && item.productPrice === price)) {
            dispatch(addCartItem({
                _id: product._id,
                name: product.name,
                productQuantity: 1,
                productPrice: price,
                generalPrice: price,
                size: size,
                unit: product.units.unitMain,
                img: product.img,
            }))
        } else {
            dispatch(upProductAmount({_id: product._id, productPrice: price}))
        }
    }

    const changePrice = (e: RadioChangeEvent) => {
        let arr = e.target.value.split(' ')
        setPrice(+arr[0])
        setWeight(+arr[1])
        setSize(+arr[2])
    }

    return (
        <Layout>
            <Head>
                <title>{ product.name }</title>
                <meta name="description" content="TastyFood - самая вкусная пицца ^_^" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/icons/tasty-food-icon.ico" />
            </Head>
            <main className={ styles.main }>
                <div className={ styles["img-container"] }>
                    <Image
                        src={ product.img }
                        alt=""
                        fill/>
                </div>
                <div className={ styles.info }>
                    <h1 className={ styles.name }>{ product.name }</h1>
                    <p className={ `${ styles.block } ${ styles.description }` }>{ product.description }</p>
                    <p className={ `${ styles.block } ${ styles.composition }` }>Состав: { product.composition }</p>
                    <p className={ `${ styles.block } ${ styles.weight }` }>Масса: { weight }гр.</p>
                    {
                        product.nutrition 
                        ?
                        <div className={ styles.block }>
                            <p>Энергетическая ценность (на 100гр. продукта):</p>
                            <div className={ styles.nutrition }>
                                <div className={ styles.value }>{ product.nutrition.calories }ккал</div>
                                <div className={ styles.value }>{ product.nutrition.carbohydrates }у.</div>
                                <div className={ styles.value }>{ product.nutrition.fats }ж.</div>
                                <div className={ styles.value }>{ product.nutrition.protein }б.</div>
                            </div>
                        </div> 
                        :
                        null
                    }
                    {
                        product.prices.length > 1 ?
                        <Radio.Group 
                            className={ styles.sizes } 
                            buttonStyle="solid" 
                            onChange={changePrice}>
                            {
                                    product.prices.map(item => 
                                        <Radio.Button
                                            value={ item.price.toString() + " " + item.weight.toString() + " " + item.size.toString() }>
                                            { item.size }{ product.units.unitMain }
                                        </Radio.Button>
                                    )
                                }
                        </Radio.Group> : null
                    }
                    <Button
                        onClick={() => addProductToCart()}
                        className={ uiStyles.buy }
                        type="primary">
                        В корзину { price }р.
                    </Button>
                </div>
            </main>
        </Layout>
    )
}

export const getServerSideProps = async ({ params }:any) => {
    const res = await axios.get(
        `http://localhost:3000/api/products/${params.id}`
    );
    return {
        props: {
            product: res.data,
        },
    };
};

export default Product