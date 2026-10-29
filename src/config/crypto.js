const CryptoJS = require('crypto-js');

const SECRET_KEY =
  (typeof process !== 'undefined' && process.env?.REACT_APP_CRYPTO_SECRET) ||
  'finkuby_secure_key_2026';

/**
 * Encrypt sensitive user data
 */
export const encryptData = (data) => {
  if (data === null || data === undefined) return null;
  const stringified = typeof data === 'object' ? JSON.stringify(data) : String(data);
  return CryptoJS.AES.encrypt(stringified, SECRET_KEY).toString();
};

/**
 * Decrypt sensitive user data
 */
export const decryptData = (cipherText) => {
  if (!cipherText || typeof cipherText !== 'string') return null;
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    if (!decrypted) return null;
    return decrypted;
  } catch {
    return null;
  }
};

module.exports = {
  encryptData,
  decryptData,
};
