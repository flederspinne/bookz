import React, { Fragment } from 'react'
import cx from 'classnames'

import Box from '../Box/Box'

import s from './DropdownMenu.module.scss'


const DropdownMenu = (props) => {

    const {
        items,
        username,
        alignRight,
        alignLeft
    } = props

    const dropdownClassName = cx(s.dropdownMenu, {
        [s.right]: alignRight,
        [s.left]: alignLeft
    })

    return (
        <Fragment>
            <div className={dropdownClassName}>
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
        </Fragment>
    )
}

export default DropdownMenu
