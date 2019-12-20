import React from 'react'
import { storiesOf } from '@storybook/react'
import '../../styles/fonts.scss'
import Input from './Input'


storiesOf('Input', module)
    .add('Default', () => <Input label="Input" />)
    .add('Disabled', () => <Input label="Disabled input" disabled />)
    .add('Error', () => <Input label="Input with error" touched error="Error message" />)

