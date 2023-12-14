#! /usr/bin/env node
var shell = require('shelljs');

// Capture the version argument
var version = process.argv[2];
console.log(process.argv);
if (!version) {
  console.error('You must provide a version number. Usage: hotfix <version>');
  process.exit(1);
}

// Function to check if a command exists
function isCommandAvailable(command) {
  return shell.which(command) !== null;
}


shell.exec('echo Creating release ${version}');

shell.exec(`git flow release start ${version}`);

shell.exec('echo Release works');

shell.exec('npm version patch');

shell.exec('echo made version patch');

shell.exec('git add . && git commit -m " docs: version bump" ');

shell.exec('echo committed');

shell.exec('git flow release publish ');

shell.exec('echo published the branch 🎉');

shell.exec(
  `gh pr create --title "Release ${version}" --body "Release ${version}" --base main`
);

shell.exec('echo created the PR 🎉');