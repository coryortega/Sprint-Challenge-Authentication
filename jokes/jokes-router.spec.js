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
    });
});