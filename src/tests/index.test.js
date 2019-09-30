const index = require('../index.js');

describe('Test test', function() {

    it("expects true to be true", function() {
        expect(true).toBe(true);
    });

});

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
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('verifyToken', function () {

    const mockNext = jest.fn();   

    it('returns 403 if no token provided', function() {

        // !!! todo, currently failing

        // global.Headers = function() {
        //     return {}
        // }
        
        expect(index.verifyToken(mockRequest(), mockResponse(), mockNext)).toBe(
            "abc"
        );

    });

    it('returns 500 if error verifying token', function() {

        // !!! todo

    });

    it('does next() if token verified', function() {

        // !!! todo

    });
});