import { ButtonHTMLAttributes } from 'react'
import cx from 'classnames'

import '../styles/button.scss'

type ButtonProps =  ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean
    variant?: 'primary' | 'danger'
}

export function Button({ isOutlined = false, variant, ...props }: ButtonProps) {
    return (
        <button className={cx(
            'button',
            { 'outlined': isOutlined },
            variant
        )} {...props} />
    )
} 