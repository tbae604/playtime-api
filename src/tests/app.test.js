// const express = require('express');
// const http = require('http');
// const mongoose = require('mongoose');

const { verifyToken } = require('../app.js');

// Mock Express request and response objects
// https://codewithhugo.com/express-request-response-mocking/
const mockRequest = (sessionData) => {
    return {
        headers: {},
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
        const req = mockRequest();
        const result = verifyToken(req, res, next);
        expect(result.status).toHaveBeenCalledWith(403);
    });

    it('returns 500 if error verifying token', async() => {

        // !!! todo

    });

    it('does next() if token verified', async() => {

        // !!! todo

    });
});