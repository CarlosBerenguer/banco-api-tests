const request = require('supertest')
const { expect } = require('chai')

describe('Transferencias', () => {

    let responseLogin;

    before(async () => {
        responseLogin = await request(process.env.BASE_URL)
            .post('/login')
            .set('Content-Type', 'application/json')
            .send({
                'username': 'julio.lima',
                'senha': '123456'
            })
    })

    describe('POST /transferencias', () => {
        it('Deve retornar sucesso com 201 quando o valor da transferencia igual ou acima de 10 reais', async () => {
            //capturar TOKEN


            const token = responseLogin.body.token;

            const response = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    contaOrigem: 1,
                    contaDestino: 2,
                    valor: 10.01,
                    token: ""
                })

            expect(response.status).to.equal(201)
            console.log("response.body : " + response.body)
        })

        it('Deve retornar falha com 422 quando o valor da transferencia for abaixo e 10 reais', async () => {

            const response = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('authorization', `Bearer ${responseLogin.body.token}`)
                .send({
                    contaOrigem: 1,
                    contaDestino: 2,
                    valor: 9.99,
                    token: ""
                })

                expect(response.status).to.equal(422)
                console.log("response.body : " + response.body)
                
        })

        it('Deve retornar sucesso com 201 quando o valor da transferencia for acima de 5000 e contiver o token', async () => {
            const response = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${responseLogin.body.token}`)
                .send({
                    contaOrigem: 3,
                    contaDestino: 2,
                    valor: 5000.01,
                    token: "123456"
                })
        })
    })
})