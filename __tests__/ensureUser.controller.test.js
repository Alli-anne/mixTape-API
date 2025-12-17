import { jest } from '@jest/globals';

/**
 * 1️⃣ Create mocks
 */
const mockFindOne = jest.fn();
const mockCreate = jest.fn();

/**
 * 2️⃣ Mock module BEFORE importing anything that uses it
 */
await jest.unstable_mockModule('../models/index.js', () => ({
  __esModule: true,
  default: {
    user: {
      findOne: mockFindOne,
      create: mockCreate,
    },
  },
}));

/**
 * 3️⃣ Dynamically import mocked module + middleware
 */
const { ensureUser } = await import('../controller/ensureUser.js');

describe('ensureUser middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('if not authenticated, calls next and does nothing', async () => {
    const req = { oidc: { isAuthenticated: () => false } };
    const res = {};
    const next = jest.fn();

    await ensureUser(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(mockFindOne).not.toHaveBeenCalled();
    expect(mockCreate).not.toHaveBeenCalled();
  });

  test('if authenticated but no sub, calls next', async () => {
    const req = {
      oidc: { isAuthenticated: () => true, user: {} },
    };
    const res = {};
    const next = jest.fn();

    await ensureUser(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(mockFindOne).not.toHaveBeenCalled();
    expect(mockCreate).not.toHaveBeenCalled();
  });

  test('if authenticated and user exists, attaches user to req', async () => {
    const user = { auth0Id: 'sub1', name: 'Test' };
    mockFindOne.mockResolvedValue(user);

    const req = {
      oidc: {
        isAuthenticated: () => true,
        user: {
          sub: 'sub1',
          email: 'a@b.com',
          name: 'Test',
          photo: 'p',
        },
      },
    };
    const res = {};
    const next = jest.fn();

    await ensureUser(req, res, next);

    expect(mockFindOne).toHaveBeenCalledWith({ auth0Id: 'sub1' });
    expect(req.user).toBe(user);
    expect(next).toHaveBeenCalled();
  });

  test('if authenticated and user does not exist, creates user and attaches it', async () => {
    mockFindOne.mockResolvedValue(null);

    const created = { auth0Id: 'sub2', email: 'b@b.com' };
    mockCreate.mockResolvedValue(created);

    const req = {
      oidc: {
        isAuthenticated: () => true,
        user: {
          sub: 'sub2',
          email: 'b@b.com',
          name: 'B',
          photo: 'p',
        },
      },
    };
    const res = {};
    const next = jest.fn();

    await ensureUser(req, res, next);

    expect(mockFindOne).toHaveBeenCalledWith({ auth0Id: 'sub2' });
    expect(mockCreate).toHaveBeenCalledWith({
      auth0Id: 'sub2',
      email: 'b@b.com',
      name: 'B',
      photo: 'p',
    });
    expect(req.user).toBe(created);
    expect(next).toHaveBeenCalled();
  });
});
