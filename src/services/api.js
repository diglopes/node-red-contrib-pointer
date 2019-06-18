const axios = require("axios");

const api = axios.create({
  baseURL: "https://sms-api-pointer.pontaltech.com.br/v1/"
});

module.exports = api;
