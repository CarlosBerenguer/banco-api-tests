const request = require('supertest')
const { obterToken } = require('../helpers/autenticacao.js')
const { expect } = require('chai')
require('dotenv').config()

describe('Transferencias', () => {
    describe('POST /transferencias', () => {
        
        let token;

        beforeEach(async () => {
            token = await obterToken('julio.lima', '123456')
        })
        
        it('Deve retornar sucesso com 201 quando o valor da transferencia igual ou acima de 10 reais', async () => {
            
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
        })

        it('Deve retornar falha com 422 quando o valor da transferencia for abaixo e 10 reais', async () => {

            const response = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('authorization', `Bearer ${token}`)
                .send({
                    contaOrigem: 1,
                    contaDestino: 2,
                    valor: 9.99,
                    token: ""
                })

            expect(response.status).to.equal(422)
        })

        it('Deve retornar sucesso com 201 quando o valor da transferencia for acima de 5000 e contiver o token', async () => {

            const response = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    contaOrigem: 3,
                    contaDestino: 2,
                    valor: 5000.01,
                    token: "123456"
                })
        })
    })
})