const request = require('supertest');
const Users = require('../users/users-model.js')
const db = require("../database/dbConfig.js")
const server = require('../api/server.js');

describe("server.js", function() {

    describe('adding users', function(){

        beforeEach(async () => {
            await db('users').truncate()
        });

        describe('add()', function(){
            it('should add the users to the database', async function(){
                await Users.add({ username: 'Jim', password: 'pass' });
                await Users.add({ username: 'Garry', password: 'pass' });

                const users = await db('users');
                expect(users).toHaveLength(2);
            });
        });

        describe('confirms that database is truncated', function(){
            it('should have length of 0', async function(){
                const users = await db('users');
                expect(users).toHaveLength(0);
            });
        });

    });

    it("authorization works", async function(){
        await Users.add({ username: 'Yardel', password: 'pass' });
        return request(server)
        .post('/login')
        .send({ username: 'Yardel', password: 'pass' })
        .then(res => {
            expect(res.status).toBe(200)
        })

    });
    it('should return a 404', function () {
        return request(server)
        .post('/login')
        .then(res => {
            expect(res.status).toBe(404);
        })
    });
});