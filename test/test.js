const { convertToGeoJSON, handler } = require('../src/index');
const mockResponses = require('./mockResponses');
const axios = require('axios');

jest.mock('../src/apiTypes', () => [
  { dataname: 'Heliport', entityId: 'Heliport' }
]);

const mockApi = (response) => {
  return jest.spyOn(axios, 'get').mockResolvedValue(response);
};

describe('Lambda Normal Test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockApi(mockResponses.success);
  });

  test(`convertGeojson test`, async () => {
    const response = await axios.get('/test');
    const result = convertToGeoJSON(response.data);

    expect(result.type).toEqual('FeatureCollection');
    expect(result.features.length).toEqual(1);
    expect(result.features[0].geometry.coordinates).toEqual([138.31503, 34.841823]);
  });
});

const errorCases = [
  {
    name: 'EMPTY DATA with status code 200',
    mockResponse: mockResponses.partialData,
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
      jest.clearAllMocks();
      mockApi(mockResponse);
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