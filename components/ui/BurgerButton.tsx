import React, { FC } from "react";
import styles from "../../styles/ui/UI.module.scss"

interface BurgerButtonProps { 
    open: boolean; 
    setOpen: (v: boolean) => void;     
}; 
 
const BurgerButton:FC<BurgerButtonProps> = ({ open, setOpen }) => { 
    return ( 
        <div  
            className={ !open ? styles.burger : `${ styles.burger } ${ styles.active }` }  
            onClick={ () => setOpen(!open) }> 
            <span className={ styles.line }></span> 
        </div>  
    ); 
}; 
 
export default BurgerButton;