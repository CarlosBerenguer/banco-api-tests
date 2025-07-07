const request = require('supertest')
require('dotenv').config()

const obterToken = async (user, pwd) => {
    const responseLogin = await request(process.env.BASE_URL)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send({
            'username': user,
            'senha': pwd
        })

    return responseLogin.body.token    
}
module.exports = {
    obterToken
}