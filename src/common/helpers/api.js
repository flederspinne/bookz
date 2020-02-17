import { mapValues } from 'lodash'


// const base = 'http://localhost:4000/api/'
// const base = (process.env.REACT_APP_API_URL || 'http://localhost:4000') + '/api/'
const base = (process.env.REACT_APP_API_URL || 'http://localhost:4000') + '/api/'

const createLinks = (links) => mapValues(links, ((link) => `${base}${link}`))

const api = createLinks({
    authLogin: 'auth/login',
    authVK: 'auth/vkontakte',
    authGoogle: 'auth/google',
    authLogout: 'auth/logout',
    usersRegister: 'users/register',
    usersMe: 'users/me',
    usersAvatar: 'users/avatar'
})

export default api