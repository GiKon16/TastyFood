import React from 'react'
import Head from 'next/head'
import Layout from '@/components/Layout'
import ShoppingCart from '@/components/main/ShoppingCart'
import Slider from '@/components/main/Slider'
import ProductsList from '@/components/main/ProductsList'
import axios from 'axios'
import { FC } from 'react'

interface HomeProps {
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

const Home:FC<HomeProps> = ({ products }) => {
  return (
    <Layout>
      <Head>
        <title>TastyFood</title>
        <meta name="description" content="TastyFood - самая вкусная пицца ^_^" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icons/tasty-food-icon.ico" />
      </Head>
      <ShoppingCart/>
      <Slider/>
      <ProductsList products={ products }/>
    </Layout>
  )
}

export default Home;

export const getServerSideProps = async () => {
  const res = await axios.get("http://localhost:3000/api/products")
  return {
    props: {
      products: res.data,
    },
  }
}
