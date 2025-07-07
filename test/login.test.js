const request = require('supertest')
const { expect } = require('chai')
require('dotenv').config()
const { postLogin } = require('../fixtures/postLogin.json')

describe('Login', () => {
    describe('POST /login', () => {
        it('Deve retornar 200 com token em string com quando usar credenciais válidas', async () => {
            
            const bodyLogin = { ...postLogin }
            bodyLogin.username = "julio.lima"
            bodyLogin.senha = "123456"
            const response = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)

            expect(response.status).to.equal(200)
            expect(response.body.token).to.be.a('string')
        })
    })
})