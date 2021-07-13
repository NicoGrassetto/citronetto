/*
const PouchDB = require('pouchdb');
let toDB = new PouchDB('todolists');
toDB.info().then(function (info) {
    console.log(info);
})*/
const utils = require('./utils');

console.log(utils.progressBar(13, 25, 20));

let array = [1,3,8,9];
array.splice(1, 1)
console.log(array);

