const request = require('supertest')
const { obterToken } = require('../helpers/autenticacao.js')
const { expect } = require('chai')
require('dotenv').config()
const postTransferencias = require('../fixtures/postTransferencias.json')

describe('Transferencias', () => {
    describe('POST /transferencias', () => {

        let token;

        beforeEach(async () => {
            token = await obterToken('julio.lima', '123456')
        })

        it('Deve retornar sucesso com 201 quando o valor da transferencia igual ou acima de 10 reais', async () => {
            
            const bodyTransferencias = { ...postTransferencias }
            bodyTransferencias.contaOrigem = 1
            bodyTransferencias.contaDestino = 2
            bodyTransferencias.valor = 11
            console.log(bodyTransferencias)
            const response = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencias)

            expect(response.status).to.equal(201)
        })

        it('Deve retornar falha com 422 quando o valor da transferencia for abaixo e 10 reais', async () => {

            const bodyTransferencias = { ...postTransferencias }
            bodyTransferencias.valor = 7

            const response = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('authorization', `Bearer ${token}`)
                .send(bodyTransferencias)

            expect(response.status).to.equal(422)
        })

        it('Deve retornar sucesso com 201 quando o valor da transferencia for acima de 5000 e contiver o token', async () => {
            const bodyTransferencias = { ...postTransferencias }
            bodyTransferencias.contaOrigem = 3
            bodyTransferencias.valor = 50001.10

            const response = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencias)
        })
    })
})
