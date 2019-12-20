const request = require('supertest');

const server = require('../api/server.js');

describe("server.js", function() {
    describe('GET /', function(){
        it('should return a 404 because were not logged in', function () {
            return request(server)
            .get('/')
            .then(res => {
                expect(res.status).toBe(404);
            })
        });
        it("shopuld return text", function(){
            return request(server)
            .get('/')
            .then(res => {
                expect(res.type).toMatch("text/html")
            })
        });
        it("authorization works", function(){ //notice the skip keyword, since this is an example
            return request(server)
            .post('/login')
            .send({ username: 'Yardel', password: 'pass' })
            .then(res => {
                const token = res.body.token;
                return request(server)
                .get('/')
                .set('authorization', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTc2ODYwODM3LCJleHAiOjE1NzY4NjQ0Mzd9.Oozg_RfQSDKPdWaHIAGNfcM3PveIzlFzqvHqdNv__0s")
                .then(res => {
                    expect(res.type).toMatch("text/html")
                });
            })

        });
    });
});