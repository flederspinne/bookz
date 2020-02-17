import React from 'react'
import cx from 'classnames'

import s from './Input.module.scss'


const Input = React.forwardRef((props, ref) => {

    const {
        value,
        type,
        name,
        error,
        touched,
        label,
        disabled,
        onChange
    } = props

    const inputStyle = cx(s.input, {
        [s.error]: touched && error,
        [s.disabled]: disabled
    })

    return (
        <div className={s.inputWrapper}>
            {
                label && <label className={s.label}>{label}</label>
            }
            <input ref={ref} type={type} name={name} value={value} className={inputStyle} disabled={disabled} onChange={onChange} />
            {
                touched && error && <p className={s.errorText}>{error}</p>
            }
        </div>
    )
})

export default Input
