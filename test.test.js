const { spawnSync } = require('child_process');

describe('hotfix.js', () => {
  test('exits with status code 0 when a version number is provided', () => {
    const result = spawnSync('./hotfix.js', ['1.0.1'], { shell: true });

    expect(result.status).toBe(0);
  });
});