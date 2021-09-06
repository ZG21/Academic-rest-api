/** Packages */
const CryptoJS = require("crypto-js");
const config = require("config");

/** Encrypt password */
exports.EncryptPassword = (password) =>{
    let secretkey = config.get("secretkeys").cryptojs;
    let encryptedPassword = CryptoJS.AES.encrypt(password, secretkey).toString();
    return encryptedPassword;
}