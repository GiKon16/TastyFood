import { notification } from "antd"
import uiStyles from "../../styles/ui/UI.module.scss"

export type TAntdNotificationType = "success" | "info" | "warning" | "error"

export type TAntdNotificationPayload = {
    type: TAntdNotificationType
    message: string,
    description?: string,
    duration?: number,
}

export const openNotification = (payload: TAntdNotificationPayload) => {
    const { type, ...props } = payload
    notification[type]({
        ...props, className: uiStyles.notification
    })
}