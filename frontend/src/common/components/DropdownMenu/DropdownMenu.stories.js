import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'
import '../../styles/fonts.scss'
import DropdownMenu from './DropdownMenu'


const items = [
    {
        text: 'Пункт 1',
    },
    {
        text: 'Пункт 2',
    },
    {
        text: 'Пункт 3',
    },
]

const username = 'Имя пользователя'

storiesOf('DropdownMenu', module)
    .add('Default',
        () => <Fragment>
            <DropdownMenu items={items} alignLeft />
            <DropdownMenu items={items} alignRight />
        </Fragment>)
    .add('WithUser', () => <DropdownMenu username={username} items={items} />)