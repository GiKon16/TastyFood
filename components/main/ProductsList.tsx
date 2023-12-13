import React, { FC } from "react";
import styles from "../../styles/main/ProductsList.module.scss";
import Product from "./Product";
import Category from "./Category";

interface ProductsListProps {
    products: {
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
        prices: number[],
        sizes: {
            dimensions: number[],
            weight: number,
            unit: string,
        },
      }[]
}

const ProductsList:FC<ProductsListProps> = ({ products }) => {
    return (
        <div className={ styles.products }>
            <Category category="pizza" products={products} title="Пицца" id="pizza"/>
            <Category category="cake" products={products} title="Десерты" id="cakes"/>
            <Category category="drink" products={products} title="Напитки" id="drinks"/>
        </div>
    )
}

export default ProductsList