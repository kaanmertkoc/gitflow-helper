#!/usr/bin/env node
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

// Check for lolcat and GitHub CLI (gh)
const isLolcatAvailable = isCommandAvailable('lolcat');
const isGhAvailable = isCommandAvailable('gh');

if (isLolcatAvailable) {
  // Use the provided version to create a hotfix branch
  shell.exec(`echo Creating hotfix ${version} | lolcat`);
  shell.exec(`git flow hotfix start ${version} | lolcat`);
  shell.exec('echo Hotfix branch created | lolcat');
  // Rest of your commands with lolcat
  shell.exec('echo Hotfix works | lolcat');
  shell.exec('npm version patch | lolcat');
  shell.exec('echo made version patch | lolcat');
  shell.exec('git add . && git commit -m "docs: version bump"');
  shell.exec('echo committed | lolcat');
  shell.exec('git flow hotfix publish | lolcat');
  shell.exec('echo published the branch 🎉 | lolcat');
  if (isGhAvailable) {
    shell.exec(
      `gh pr create --title "Hotfix ${version}" --body "Hotfix ${version}" --base main`
    );
  }
  shell.exec('echo created the PR 🎉 | lolcat');
} else {
  // Use the provided version to create a hotfix branch
  shell.exec(`echo Creating hotfix ${version}`);
  shell.exec(`git flow hotfix start ${version}`);
  shell.exec('echo Hotfix branch created');

  // Rest of your commands
  shell.exec('echo Hotfix works');
  shell.exec('npm version patch');
  shell.exec('echo made version patch');
  shell.exec('git add . && git commit -m "docs: version bump"');
  shell.exec('echo committed');
  shell.exec('git flow hotfix publish');
  shell.exec('echo published the branch 🎉');
  if (isGhAvailable) {
    shell.exec(
      `gh pr create --title "Hotfix ${version}" --body "Hotfix ${version}" --base main`
    );
  }
  shell.exec('echo created the PR 🎉');
}
