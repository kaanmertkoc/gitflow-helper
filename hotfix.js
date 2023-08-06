#! /usr/bin/env node
var shell = require('shelljs');

shell.exec(
  'npm version patch && git add . && git commit -m " docs: version bump " && git flow hotfix publish && gh pr create --title "Hotfix" --body "Hotfix" --base main --head hotfix/$(git describe --abbrev=0 --tags)'
);
