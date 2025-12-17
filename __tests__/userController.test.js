import { jest } from '@jest/globals';

await jest.unstable_mockModule('../models/index.js', () => ({
  __esModule: true,
  default: {
    user: {
      find: jest.fn()
    }
  }
}));

const { default: db } = await import('../models/index.js');
const { getAllUsers } = await import('../controller/userController.js');

describe('userController.getAllUsers', () => {
  test('returns users in response', async () => {
    const users = [{ name: 'A' }, { name: 'B' }];
    db.user.find.mockResolvedValue(users);

    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    const res = { status };

    await getAllUsers({}, res, jest.fn());

    expect(db.user.find).toHaveBeenCalled();
    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith({
      success: true,
      data: users
    });
  });
});
