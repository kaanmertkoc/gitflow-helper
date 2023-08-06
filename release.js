#! /usr/bin/env node
var shell = require('shelljs');

shell.exec('echo Release works');

shell.exec(
  'npm version patch && git add . && git commit -m " docs: version bump " && git flow release publish && gh pr create --title "Release" --body "Release" --base main --head hotfix/$(git describe --abbrev=0 --tags)'
);
