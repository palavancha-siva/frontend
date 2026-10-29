const { validateProfileForm } = require('../src/components/Profile/profileForm');

describe('Profile Form Validation Tests', () => {
  it('should validate complete and correct profile data', () => {
    const validData = {
      fullName: 'Rahul Sharma',
      email: 'rahul.sharma@example.com',
      pan: 'ABCDE1234F',
      dob: '1990-05-15',
    };

    const result = validateProfileForm(validData);
    expect(result.isValid).toBe(true);
    expect(Object.keys(result.errors).length).toBe(0);
  });

  it('should flag errors when required fields are missing or PAN format is invalid', () => {
    const invalidData = {
      fullName: '',
      email: 'invalid-email',
      pan: '12345',
      dob: '',
    };

    const result = validateProfileForm(invalidData);
    expect(result.isValid).toBe(false);
    expect(result.errors.fullName).toBeDefined();
    expect(result.errors.email).toBeDefined();
    expect(result.errors.pan).toBeDefined();
  });
});
