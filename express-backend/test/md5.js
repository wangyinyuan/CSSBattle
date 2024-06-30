const md5 = require("md5");

const str1 = "long time no see!";
const str2 = "long time no see?";

function logMd5(message) {
  const md5Message = md5(message);
  console.log(md5Message);
  return md5Message;
}

logMd5(str1);
logMd5(str2);