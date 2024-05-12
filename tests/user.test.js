const supertest = require('supertest');
const { app, server } = require('../index');

const request = supertest(app);

describe("Conexão com servidor", () => {
    it("Deve se conectar com a porta 8080", async () => {
        return request.get("/").then(res => {
            expect(res.statusCode).toEqual(200);
        }).catch(err => {
            throw err;
        });
    });

    afterAll(async () => {
        await closeServer();
    });
});

async function closeServer() {
    return new Promise(resolve => {
        server.close(resolve);
    });
}
