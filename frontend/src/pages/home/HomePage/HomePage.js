import React, { Fragment, useState } from 'react'

import Button from '../../../common/components/Button/Button'
import Input from '../../../common/components/Input/Input'

import api from '../../../common/helpers/api'

import s from './HomePage.module.scss'


const HomePage = () => {

    const [srcState, setSrcState] = useState(require('../../../common/assets/images/avatar.jpg'))
    const [image, setImage] = useState(undefined)

    let imgInput = React.createRef()

    const openUploadDialog = () => {
        imgInput.current.click()
    }

    const onAvatarChange = (e) => {
        const reader = new FileReader()

        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            reader.readAsDataURL(file)
            reader.onload = () => {
                setSrcState(URL.createObjectURL(file))
                setImage(file)
            }
        }
    }

    const uploadImage = () => {
        const data = new FormData()
        data.append('file', image)

        fetch(api.usersAvatar, {
            method: 'POST',
            mode: 'cors',
            withCredentials: true,
            credentials: 'include',
            body: data
        })
            .then((data) => {
                console.log(data)
            })
    }

    return(
        <Fragment>
            <img className={s.avatar} src={srcState} onClick={openUploadDialog}/>
            <Button onClick={(e) => openUploadDialog(e)}>Выбрать аватар</Button>
            <Input ref={imgInput} type="file" label="Выберите изображение" name="avatar" onChange={(e) => onAvatarChange(e)} />
            <Button onClick={(e) => uploadImage(e)}>Загрузить аватар</Button>
        </Fragment>
    )
}

export default HomePage