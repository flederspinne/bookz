import React from 'react'
import cx from 'classnames'

import Box from '../Box/Box'

import s from './Panel.module.scss'


const Panel = (props) => {

    const {
        title,
        children,
        className,
    } = props

    return (
        <Box p="sm" className={cx(s.panel, className)}>
            <p className={s.title}>{title}</p>
            <Box mt="xsm">{children}</Box>
        </Box>
    )
}

export default Panel