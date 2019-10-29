/**
 * page 表结构
 */

let mongoose = require("mongoose");

const table_struct = {
  uid: Number,
  name: String,
  creator: String,
  updateTime: { type: Date, default: Date.now },
  content: String
};

module.exports = new mongoose.Schema(table_struct);
