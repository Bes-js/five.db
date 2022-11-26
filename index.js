exports.bson = () => require("./src/drivers/bson");
exports.sqlite = () => require("./src/drivers/sqlite");
throw new Error("Bir Veritabanı Formatı Belirtmelisin [ Örn; 'const db = require('five.db').sqlite();' Veya 'const db = require('five.db').bson();' ]");