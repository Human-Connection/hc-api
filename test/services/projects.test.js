const assert = require('assert');
const app = require('../../server/app');

describe('\'projects\' service', () => {
  it('registered the service', () => {
    const service = app.service('projects');

    assert.ok(service, 'Registered the service');
  });
});
