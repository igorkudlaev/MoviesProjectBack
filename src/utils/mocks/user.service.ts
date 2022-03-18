export default class MockUserService {
  existedUser = {
    id: 1,
    username: 'testuser',
    password: 'superpassword',
  };

  async findOne(username: string) {
    if (username === this.existedUser.username) {
      return this.existedUser;
    }
    return null;
  }

  async create(userDto) {
    return {
      id: Date.now(),
      ...userDto,
    };
  }
}
