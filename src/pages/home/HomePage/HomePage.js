import React, { Fragment, useState } from 'react'

import Button from '../../../common/components/Button/Button'
import Input from '../../../common/components/Input/Input'

import api from '../../../common/helpers/api'

import s from './HomePage.module.scss'


const HomePage = () => {

    const [srcState, setSrcState] = useState(require('../../../common/assets/images/avatar.jpg'))
    const [image, setImage] = useState(undefined)

    let imgInput = React.createRef()

    const getSignedRequest = (file) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${api.usersAvatar}?file-name=${file.name}&file-type=${file.type}`);
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    const response = JSON.parse(xhr.responseText);
                    uploadFile(file, response.signedRequest, response.url);
                }
                else{
                    alert('Could not get signed URL.');
                }
            }
        };
        xhr.send();
    }

    const uploadFile = (file, signedRequest, url) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', signedRequest);
        xhr.onreadystatechange = () => {
            console.log('xhr', xhr)
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    setSrcState(url)
                }
                else{
                    alert('Could not upload file.');
                }
            }
        };
        xhr.send(file);
    }

    const openUploadDialog = () => {
        imgInput.current.click()
    }

    const onAvatarChange = (e) => {
        const reader = new FileReader()

        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            setImage(file)
            reader.readAsDataURL(file)
            reader.onload = () => {
                setSrcState(URL.createObjectURL(file))
            }
        }
    }

    const uploadImage = () => {
        const data = new FormData()
        data.append('file', image)

        getSignedRequest(image)
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