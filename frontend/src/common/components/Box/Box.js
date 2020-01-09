import React from 'react'
import cx from 'classnames'

import s from './Box.module.scss'


const allowedKeys = ['m', 'mt', 'mr', 'mb', 'ml', 'p', 'pt', 'pr', 'pb', 'pl']
const allowedSizes = ['xxs', 'xs', 'xsm', 'sm', 'md', 'lg', 'xlg', 'xxl', 'xxxl']

const getClasses = (keys) => {
  const classes = []
  Object.keys(keys).forEach((key) => {
    const value = keys[key]
    if (!value) {
      return
    }
    if (!allowedKeys.includes(key)) {
      console.error(`Wrong "key" – ${key} passed to Box component`)
    }
    if (!allowedSizes.includes(value)) {
      console.error(`Wrong "value" – ${value} passed for key "${key}" to Box component`)
    }
    classes.push(s[`${key}_${value}`])
  })
  return classes
}

const Box = (props) => {
  const {
    children, className, id, alignCenter, alignRight, alignLeft, onClick,
    center, inline, dataTestId, ...keys
  } = props

  const rootClassName = cx(className, ...getClasses(keys), {
    [s.center]: center,
    [s.inline]: inline,
    [s.alignCenter]: alignCenter,
    [s.alignRight]: alignRight,
    [s.alignLeft]: alignLeft,
  })

  return (
    <div className={rootClassName} id={id} data-testid={dataTestId} onClick={onClick}>
      {children}
    </div>
  )
}


export default Box
