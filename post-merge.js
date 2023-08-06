#! /usr/bin/env node
var shell = require('shelljs');

shell.exec(
  'post-merge": "git push origin dev --tags && git checkout main && git push origin main --tags'
);
