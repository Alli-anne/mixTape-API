import { jest } from '@jest/globals';

await jest.unstable_mockModule('express-validator', () => ({
  validationResult: jest.fn()
}));

const { validationResult } = await import('express-validator');
const { default: validate } = await import('../middleware/validate.js');

describe('validate middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('calls next when no validation errors', () => {
    validationResult.mockReturnValue({
      isEmpty: () => true
    });

    const req = {};
    const res = {};
    const next = jest.fn();

    validate(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test('responds 400 when validation has errors', () => {
    validationResult.mockReturnValue({
      isEmpty: () => false,
      array: () => [{ param: 'songId', msg: 'songId is required' }]
    });

    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    const res = { status };
    const req = {};
    const next = jest.fn();

    validate(req, res, next);

    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith({
      success: false,
      errors: [{ param: 'songId', msg: 'songId is required' }]
    });
    expect(next).not.toHaveBeenCalled();
  });
});
