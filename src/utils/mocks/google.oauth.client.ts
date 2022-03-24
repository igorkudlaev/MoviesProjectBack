export class MockOauthClient {
  verifyIdToken({ idToken, audience }) {
    if (idToken === 'valid token') {
      return new Ticket();
    }
    return false;
  }
}

class Ticket {
  getPayload() {
    return {
      email: 'test@email.com',
    };
  }
}
