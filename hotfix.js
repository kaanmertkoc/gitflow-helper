#! /usr/bin/env node
var shell = require('shelljs');

shell.exec('echo Hotfix works');

shell.exec('npm version patch');

shell.exec('echo made version patch');

shell.exec('git add . && git commit -m " docs: version bump" ');

shell.exec('echo committed');

shell.exec('git flow hotfix publish ');

shell.exec('echo published the branch 🎉');

shell.exec('gh pr create --title "Hotfix" --body "Hotfix" --base main');

shell.exec('echo created the PR 🎉');