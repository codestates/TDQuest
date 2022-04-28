const awsParamStore = require("aws-param-store");
const paramName = "config";
const region = 'ap-northeast-2';

const parameter = awsParamStore.getParameterSync(paramName, {region});

module.exports = JSON.parse(parameter.Value)