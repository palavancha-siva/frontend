const { encryptData, decryptData } = require('../src/config/crypto');

describe('Crypto Utility Unit Tests', () => {
  it('should encrypt and decrypt a plaintext string correctly', () => {
    const secretMessage = 'finkuby_super_secret_payload_123';
    const encrypted = encryptData(secretMessage);

    expect(encrypted).toBeDefined();
    expect(encrypted).not.toEqual(secretMessage);

    const decrypted = decryptData(encrypted);
    expect(decrypted).toEqual(secretMessage);
  });

  it('should encrypt and decrypt an object payload correctly', () => {
    const userPayload = { userId: 101, name: 'Alice Smith', pan: 'ABCDE1234F' };
    const encrypted = encryptData(userPayload);
    const decrypted = decryptData(encrypted);

    expect(JSON.parse(decrypted)).toEqual(userPayload);
  });

  it('should safely return empty string or null on invalid decryption input', () => {
    const decrypted = decryptData('invalid-non-base64-content');
    expect(decrypted).toBeNull();
  });
});
