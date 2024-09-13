const { handler } = require('../src/index');
const mockResponses = require('./mockResponses');
const AWS = require('aws-sdk');

jest.mock('../src/apiTypes', () => [
  { dataname: 'Heliport', entityId: 'Heliport' }
]);

jest.mock('axios');
jest.mock('aws-sdk');

const errorCases = [
  {
    name: 'EMPTY DATA with status code 200',
    mockResponse: 'emptyData',
    expectedStatusCode: 500,
  },
  {
    name: 'null with status code 200',
    mockResponse: mockResponses.emptyData,
    expectedStatusCode: 500,
  },
  {
    name: 'data not Exist with status code 200',
    mockResponse:mockResponses.nonExistData,
    expectedStatusCode: 500,
  },
  {
    name: 'status code 400',
    mockResponse: mockResponses.clientError,
    expectedStatusCode: 500,
  },
  {
    name: 'status code 500',
    mockResponse: mockResponses.serverError,
    expectedStatusCode: 500,
  },
];

errorCases.forEach(({ name, mockResponse }) => {
  describe('Lambda Error Handler Tests', () => {
    beforeEach(() => {
      jest.resetModules();
      jest.mock('axios', () => ({
        get: jest.fn(() => Promise.resolve(mockResponse))
      }));
    });

    test(`Error handling is fine when ${name}`, async () => {
      const result = await handler();
      const body = JSON.parse(result.body);

      expect(result.statusCode).toBe(500);
      expect(body.results).toEqual([]);
      expect(body.errors.length).toBeGreaterThan(0);
    });
  });
});