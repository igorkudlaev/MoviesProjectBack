export default class MockRedis {
  data = {};
  async del(key: string): Promise<0 | 1> {
    const value = this.data[key];
    if (value) {
      delete this.data[key];
      return 1;
    }
    return 0;
  }
  async set(key: string, value: any) {
    this.data[key] = value;
  }
}
