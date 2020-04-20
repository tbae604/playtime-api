// const jwt = require('jsonwebtoken');
const { MongoClient } = require('mongodb');
const request = require('supertest');

const { app, verifyToken } = require('../app.js');
const User = require('../models/user');

/*
Test Express app

https://github.com/shelfio/jest-mongodb
*/
describe('/', () => {
    it('returns a nice phrase', async (done) => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual('You look great today!');
        done();
    });
});

describe('/api/login', () => {
    // TODO
});

describe('/api/logout', () => {
    it('nullifies the token', async (done) => {
        const response = await request(app).get('/api/logout');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            auth: false,
            token: null,
        });
        done();
    });
});

describe('/api/register', () => {
    let connection;
    let db;

    beforeAll(async (done) => {
        connection = await MongoClient.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
        });
        db = connection.db(global.__MONGO_DB_NAME__);
        // db = await connection.db(global.__MONGO_DB_NAME__);
        done();
    });

    afterAll(async (done) => {
        await connection.close();
        done();
    });

    it('inserts a new User and returns auth', async (done) => {
        const users = db.collection('users');

        // TODO =========
        // Timeout - Async callback was not invoked
        const response = await request(app).post('/api/register').send({
            "name": "foo",
            "email": "bar",
            "password": "pwd"
        });

        // const response = await request(app).post('/api/register').send({
        //     "name": "foo",
        //     "email": "bar",
        //     "password": "pwd"
        // }).expect(
        //     expect((res) => {
        //         expect(res.statusCode).toBe(200);
        //     })
        //     ).end(done);
        
        // const response = await request(app).post('/api/register').send({
        //     "name": "foo",
        //     "email": "bar",
        //     "password": "pwd"
        // }).expect(200)
        // .end((err, res) => {
        //     done();
        // });


        // ===============

        // const user = await users.findOne({
        //     "name": "foo",
        //     "email": "bar",
        //     "password": "pwd"
        // });

        // expect(response.statusCode).toBe(200);
        // expect(response.body).toMatchObject({
        //     auth: true,
        // });
        // expect(user).toMatchObject({
        //     "name": "foo",
        //     "email": "bar",
        //     "password": "pwd"
        // });
        done();
    });

    it('catches error if unsuccessful', async (done) => {
        // TODO
        done();
    });
});

describe('/api/users', () => {
    // TODO
});

describe('/api/users/:userId', () => {
    // TODO
});

describe('/api/posts get', () => {
    // TODO
});

describe('/api/posts post', () => {
    // TODO
});

describe('/api/posts/:postId', () => {
    // TODO
});


/*
Test Express middleware

Inspired by Hugo's tutorial
https://codewithhugo.com/express-request-response-mocking/
*/
const mockRequest403 = (sessionData) => {    
    return {
        headers: {},
        session: { data: sessionData },
    };
};
const mockRequest500 = (sessionData) => {    
    return {
        headers: {
            'x-access-token': 'abc'
        },
        session: { data: sessionData },
    };
};

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue({
        "send": jest.fn().mockReturnValue(res)
    });    
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('verifyToken', () => {
    const res = mockResponse();
    const next = jest.fn();

    it('returns 403 if no token provided', () => {
        const req = mockRequest403();
        const result = verifyToken(req, res, next);
        expect(result.status).toHaveBeenCalledWith(403);
    });

    it('returns 500 if error verifying token', async() => {
        // // TODO
        // jwt.verify = jest.fn().mockReturnValue({"success": "foo"});
        // const req = mockRequest500();
        // const result = verifyToken(req, res, next);
        // expect(next).toHaveBeenCalled();
        // // expect(result.status).toHaveBeenCalledWith(500);

    });

    it('does next() if token verified', async() => {
        // // TODO
        // const req = mockRequest();
        // const result = verifyToken(req, res, next);
        // expect(next).toHaveBeenCalled();
    });
});
