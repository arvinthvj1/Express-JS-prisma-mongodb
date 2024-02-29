const CryptoJS = require('crypto-js');

const decryptText = (encryptedText, secretKey) => {
  const decryptedBytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
  const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return decryptedText;
};

module.exports = {
    decryptText
}
