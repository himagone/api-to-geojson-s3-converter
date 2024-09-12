const { handler } = require('../src/index');
const mockResponses = require('./mockResponses');
const AWS = require('aws-sdk');

jest.mock('../src/apiTypes', () => [
  { dataname: 'Heliport', entityId: 'Heliport' }
]);


// API response with status code 200
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve(mockResponses.success))
}));

describe('Lambda Handler Tests', () => {
  test('with status code 200', async () => {
    expect(result.statusCode).toBe(200);
    expect(body.results.length).toBeGreaterThan(0);
    expect(body.errors).toEqual([]);
  });
});

// API response EMPTY DATA with status code 200
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve(mockResponses.emptyData))
}));

describe('Lambda Handler Tests', () => {
  test('Error handling is fine when status code is 200 and data is EMPTY', async () => {
    const result = await handler();
    const body = JSON.parse(result.body);

    expect(result.statusCode).toBe(500);
    expect(body.results).toEqual([]);
    expect(body.errors.length).toBeGreaterThan(0);
  });
});

// API response null with status code 200
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve(mockResponses.nullData))
}));

describe('Lambda Handler Tests', () => {
  test('Error handling is fine when status code is 200 and data is null', async () => {
    const result = await handler();
    const body = JSON.parse(result.body);
    expect(result.statusCode).toBe(500);
    expect(body.results).toEqual([]);
    expect(body.errors.length).toBeGreaterThan(0);
  });
});

// API response with status code 400
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve(mockResponses.clientError))
}));

describe('Lambda Handler Tests', () => {
  test('Error handling is fine when status code is 400', async () => {
    const result = await handler();
    const body = JSON.parse(result.body);

    expect(result.statusCode).toBe(500);
    expect(body.results).toEqual([]);
    expect(body.errors.length).toBeGreaterThan(0);
  });
});


// API response with status code 500
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve(mockResponses.serverError))
}));

describe('Lambda Handler Tests', () => {
  test('Error handling is fine when status code is 500', async () => {
    const result = await handler();
    const body = JSON.parse(result.body);

    expect(result.statusCode).toBe(500);
    expect(body.results).toEqual([]);
    expect(body.errors.length).toBeGreaterThan(0);
  });
});