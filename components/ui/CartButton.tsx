import React, { FC } from "react";
import uiStyles from "../../styles/ui/UI.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { TRootState } from "@/redux/store";

interface CartButtonProps {
    type?: string,
    open: boolean,
    setOpen: (v: boolean) => void;
}

const CartButton:FC<CartButtonProps> = ({ type, open, setOpen }) => {
    const quantity = useSelector((state: TRootState) => state.cart.quantity)

    return (
        <div
            id="cart"
            className={ type === "nav" ? uiStyles["nav-cart"] : uiStyles.cart }
            onClick={ () => setOpen(!open) }>
            <Image
                src="/images/cart.svg"
                alt=""
                width={35}
                height={35}/>
            <div className={ uiStyles.amount }>
                { quantity }
            </div>
        </div>
    )
}

export default CartButton;