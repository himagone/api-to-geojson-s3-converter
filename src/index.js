const axios = require('axios');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const apiTypes = require('./apiTypes.js');

const EXTERNAL_API_URL = process.env.EXTERNAL_API_URL;
const FIWARE_SERVICE = process.env.FIWARE_SERVICE;
const API_KEY = process.env.API_KEY;
const S3_BUCKET = process.env.S3_BUCKET;
function findValueByKey(obj, targetKey) {
  if (obj && typeof obj === 'object') {
    if (targetKey in obj) {
      return obj[targetKey];
    }
    for (const value of Object.values(obj)) {
      const result = findValueByKey(value, targetKey);
      if (result !== undefined) {
        return result;
      }
    }
  }
  return undefined;
}
function getCoordinates(facility) {
  const longitude = findValueByKey(facility, 'Longitude');
  const latitude = findValueByKey(facility, 'Latitude');
  
  if (longitude !== undefined && latitude !== undefined) {
    return [longitude, latitude];
  }
  
  console.warn('Longitude or Latitude not found in facility:', facility);
  return null;
}

function extractPropeties(obj, prefix=''){
  const properties ={};
  for(const [key, value] of Object.entries(obj)){
    if(value && typeof value === 'object'){
      if('value' in value){
        properties[`${prefix}${key}`] = value.value;
      }else{
        Object.assign(properties, extractPropeties(value, `${prefix}${key}.`));
      }
    }else{
      properties[`${prefix}${key}`] = value;
    }
  }
  return properties;
}
function convertToGeoJSON(facilities){
  const features = facilities.map(facility => {
    const coordinates = getCoordinates(facility);

    const properties = extractPropeties(facility);

    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: coordinates
      },
      properties: properties
    };
  });
  return {
    type: "FeatureCollection",
    features: features
  };
}

async function callApi(apiType){
  const requestTraceId = uuidv4();
  const headers = {
    'fiware-service': FIWARE_SERVICE,
    'fiware-servicepath': '/' + apiType.dataname,
    'x-request-trace-id': requestTraceId,
    'apikey': API_KEY
  };
  const param = new URLSearchParams({ type: apiType.entityId });
  const requestURL = `${EXTERNAL_API_URL}?${param.toString()}`;
  console.log('Calling'+ requestURL);
  try {
    const response = await axios.get(requestURL, {
      headers,
      timeout: 30000
    });
    return response;
  } catch (error) {
    console.error(`Failed to save ${apiType.dataname} to S3.`, error);
    throw error;
  }
};

async function pushToS3(dataname,response){
  try{
    const now = moment();
    const fileName = `${dataname}/${now.format('YYYY-MM-DD')}/${now.format('HH-mm-ss')}.json`;

    await s3.putObject({
      Bucket: S3_BUCKET,
      Key: fileName,
      Body: JSON.stringify(response),
      ContentType: 'application/json'
    }).promise();
    console.log(`Successfully saved ${dataname} to S3.`);
  } catch (error) {
    console.error(`Failed to save ${dataname} to S3.`, error);
    throw error;
  }
}

exports.handler = async (event) => {
  const results = [];
  const errors = [];
  for(const apiType of apiTypes){
    try{
      console.log(`Processing apiType: ${apiType.dataname}`);
      const apiData = await callApi(apiType);
      const convertResult = convertToGeoJSON(apiData.data);
      await pushToS3(apiType.dataname, convertResult);
      results.push({ apiType: apiType.dataname, status: 'success' });
    }catch(error){
      console.error('Error in Lambda execution:', error);
      errors.push({ apiType: apiType.dataname, status: 'error', message: error.message });
    }
  }
  return {
    statusCode: errors.length > 0 ? 500 : 200,
    body: JSON.stringify({ results, errors })
  };
}