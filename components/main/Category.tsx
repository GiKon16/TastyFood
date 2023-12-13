import React, { FC } from "react";
import styles from "../../styles/main/Category.module.scss";
import Product from "./Product";

interface ProductsListProps {
    category: string,
    id: string,
    title: string,
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

const Category:FC<ProductsListProps> = ({ category, id, title, products }) => {
    return (
        <div id={ id } className={ styles.category }>
            <div className={ styles.content }>
                <h1 className={ styles.title }>{ title }</h1>
                <div className={ styles.list }>
                {
                    products.map(product => 
                        product.type === category 
                        ? <Product product={ product }/>  
                        : null  
                    )
                }    
            </div>
            </div>
        </div>
    )
}

export default Category