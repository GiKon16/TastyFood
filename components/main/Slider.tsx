import React, { FC, useEffect, useState } from "react";
import styles from "../../styles/main/Slider.module.scss";
import Image from "next/image";

const Slider:FC = () => {
    type Special = {
        img: {
            id: number,
            path: string,
        }
        title: string,
    }[]

    const specials: Special = [
        { 
            img: {id: 1, path: "/images/pizza-mock.svg"},
            title: "Новые пиццы" ,
        },
        { 
            img: {id: 2, path: "/images/pizza-mock.svg"},
            title: "Скидка 10% всю неделю" , 
        },
        { 
            img: {id: 3, path: "/images/pizza-mock.svg"},
            title: "Мы открылись!" , 
        },
    ]

    const [indexImg, setIndexImg] = useState<number>(0)

    const handleArrow = (direction:string) => {
        if (direction === "left") { setIndexImg(indexImg !== 0 ? indexImg - 1 : 2) }
        if (direction === "right") { setIndexImg(indexImg !== 2 ? indexImg + 1 : 0) }
    }

    return (
        <div id="news" className={ styles.slider }>
            <div 
                className={ `${styles.arrow} ${styles.left}` }
                onClick={() => handleArrow("left")}>
                <Image 
                    src="/images/left-arrow.svg" 
                    alt="" 
                    fill/>
            </div>
            <div 
                className={ styles.wrapper }
                style={{ 
                    transform: `translateX(${ -100 * indexImg }vw)`,
                    width: `${specials.length * 100}vw` 
                }}>
                { specials.map(special => 
                    <div className={ styles["img-container"] }>
                        <Image
                            src={ special.img.path }
                            alt=""
                            fill/>
                        <h1 className={ styles.title }>{ special.title }</h1>   
                    </div>
                ) }
            </div>
            <div 
                className={ `${styles.arrow} ${styles.right}` }
                onClick={() => handleArrow("right")}>
                <Image 
                    src="/images/right-arrow.svg" 
                    alt="" 
                    fill/>
            </div>
        </div>
    )
}

export default Slider