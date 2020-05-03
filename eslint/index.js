"use strict";

const processor = require("./processor");
console.log("HOLA DESDEL INDEX");
module.exports = {
  processors: {
    "cat-file": processor,
  },
};
