import React from 'react'

import Box from '../Box/Box'

import s from './DropdownMenu.module.scss'


const DropdownMenu = (props) => {

    const {
        items,
        username
    } = props

    return (
        <div className={s.dropdownMenu}>
            {
                username
                    && <Box p="xs" className={s.username}>{username}</Box>
            }
            {
                items.map((item, index) => {
                    return (
                        <Box p="xs" key={index} className={s.menuItem} onClick={item.onClick}>{item.text}</Box>
                    )
                })
            }
        </div>
    )
}

export default DropdownMenu
