// utils/checksum.js
const crypto = require("crypto");

function genchecksum(params, key, cb) {
  const data = genchecksumdata(params);
  const salt = crypto.randomBytes(4).toString("hex");
  const hashString = data + "|" + salt;
  const checksum = crypto
    .createHmac("sha256", key)
    .update(hashString)
    .digest("hex") + salt;
  cb(undefined, checksum);
}

function genchecksumdata(params) {
  const data = Object.keys(params)
    .sort()
    .map((key) => params[key])
    .join("|");
  return data;
}

function verifychecksum(params, key, checksum) {
  const data = genchecksumdata(params);
  const salt = checksum.slice(-8);
  const hashString = data + "|" + salt;
  const hash = crypto
    .createHmac("sha256", key)
    .update(hashString)
    .digest("hex");
  return hash + salt === checksum;
}

module.exports = { genchecksum, verifychecksum };
