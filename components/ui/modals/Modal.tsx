import React, { FC } from "react";
import uiStyles from "../../../styles/ui/UI.module.scss";
import { Button } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons"

interface ModalProps {
    children: React.ReactNode,
    visible: boolean,
    setVisible: (visible: boolean) => void,
}

const Modal:FC<ModalProps> = ({ children, visible, setVisible }) => {
    return (
        <div className={ !visible ? uiStyles.logmodal : `${ uiStyles.logmodal } ${ uiStyles.active }`}>
            <div className={ uiStyles.back }></div>
            <div 
                className={ uiStyles.content } >
                <Button
                    onClick={ () => setVisible(false) }
                    ghost={ true }
                    icon={ <CloseCircleOutlined/> }
                    className={ uiStyles.close }>
                </Button>
                { children }
            </div>
        </div>
    )
}

export default Modal