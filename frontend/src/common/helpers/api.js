import { mapValues } from 'lodash'


const base = 'http://localhost:4000/api/'

const createLinks = (links) => mapValues(links, ((link) => `${base}${link}`))

const api = createLinks({
    authLogin: 'auth/login',
    authLogout: 'auth/logout'
})

export default api