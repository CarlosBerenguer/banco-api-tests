const request = require('supertest')
const { obterToken } = require('../helpers/autenticacao.js')
const { expect } = require('chai')
require('dotenv').config()
const postTransferencias = require('../fixtures/postTransferencias.json')

describe('Transferencias', () => {
    let token;

    beforeEach(async () => {
        token = await obterToken('julio.lima', '123456')
    })
    
    describe('POST /transferencias', () => {

        it('Deve retornar sucesso com 201 quando o valor da transferencia igual ou acima de 10 reais', async () => {
            
            const bodyTransferencias = { ...postTransferencias }
            
            bodyTransferencias.contaOrigem = 1
            bodyTransferencias.contaDestino = 2
            bodyTransferencias.valor = 11
                        
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

    describe('GET /transferencias/{id}', () => {
        
        it('Deve retornar sucesso com 200 e dados iguais ao registro de transferencia contido no banco quando o ID for valido', async () => {
            
            const idTransferencia = 8
            const response = await request(process.env.BASE_URL)
                .get(`/transferencias/${idTransferencia}`)
                .set('Authorization', `Bearer ${token}`)

                expect(response.status).to.equal(200)
                expect(response.body.id).to.equal(8)
                expect(response.body.id).to.be.a('number')
                expect(response.body.conta_origem_id).to.equal(1)
                expect(response.body.conta_destino_id).to.equal(2)
                expect(response.body.valor).to.equal(10.01)
        })
    })
    describe('GET /transferencias', () => {
        it('Deve retornar 10 elementos na paginação quando informar limite de 10 registros', async () => {
            const response = await request(process.env.BASE_URL)
                .get('/transferencias?page=1&limit=10')
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).to.equal(200)
            expect(response.body.limit).to.equal(10)
            expect(response.body.page).to.equal(1)
            expect(response.body.transferencias).to.have.lengthOf(10)
        })
    })
})
