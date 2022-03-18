export default class MockUserRepository {
  data = [];
  async create(dto) {
    const newUser = {
      ...dto,
      id: Date.now(),
    };
    this.data.push(newUser);
    return newUser;
  }
  async findOne(query) {
    return this.data.find((item) => {
      for (const key in query['where']) {
        if (query['where'][key] === item[key]) {
          return item;
        }
      }
    });
  }
}
