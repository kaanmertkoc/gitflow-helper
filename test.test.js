const { spawnSync } = require('child_process');

describe('hotfix.js', () => {
  test('exits with status code 1 when no version number is provided', () => {
    const result = spawnSync('./hotfix.js', [], { shell: true });

    expect(result.status).toBe(1);
    expect(result.stderr.toString()).toContain(
      'You must provide a version number. Usage: hotfix <version>'
    );
  });
});
