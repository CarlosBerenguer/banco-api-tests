const request = require('supertest')
require('dotenv').config()
const postLogin = require('../fixtures/postLogin.json')

const obterToken = async (user, pwd) => {
    
    const credentials = {
        username: user,
        senha: pwd
    }

    const bodyLogin = { ...postLogin, ...credentials }

    const responseLogin = await request(process.env.BASE_URL)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send(bodyLogin)

    return responseLogin.body.token
}
module.exports = {
    obterToken
}