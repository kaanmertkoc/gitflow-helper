#!/usr/bin/env node
var shell = require('shelljs');
const { exec } = require('child_process');


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

// Function to execute commands with lolcat for colorful output
function execWithLolcat(command) {
    exec(`${command} | lolcat`);
    console.log('ayo');
}

// Check for lolcat and GitHub CLI (gh)
const isLolcatAvailable = isCommandAvailable('lolcat');
console.log('🚀 ~ file: hotfix.js:24 ~ isLolcatAvailable:', isLolcatAvailable);
const isGhAvailable = isCommandAvailable('gh');
console.log('🚀 ~ file: hotfix.js:26 ~ isGhAvailable:', isGhAvailable);

if (isLolcatAvailable) {
  // Use the provided version to create a hotfix branch
  execWithLolcat(`echo Creating hotfix ${version}`);
  execWithLolcat(`git flow hotfix start ${version}`);
  execWithLolcat('echo Hotfix branch created');

  // Rest of your commands with lolcat
  execWithLolcat('echo Hotfix works');
  execWithLolcat('npm version patch');
  execWithLolcat('echo made version patch');
  execWithLolcat('git add . && git commit -m "docs: version bump"');
  execWithLolcat('echo committed');
  execWithLolcat('git flow hotfix publish');
  execWithLolcat('echo published the branch 🎉');
  if (isGhAvailable) {
    execWithLolcat(
      `gh pr create --title "Hotfix ${version}" --body "Hotfix ${version}" --base main`
    );
  }
  execWithLolcat('echo created the PR 🎉');
} else {
  // Use the provided version to create a hotfix branch
  exec(`echo Creating hotfix ${version}`);
  exec(`git flow hotfix start ${version}`);
  exec('echo Hotfix branch created');

  // Rest of your commands
  exec('echo Hotfix works');
  exec('npm version patch');
  exec('echo made version patch');
  exec('git add . && git commit -m "docs: version bump"');
  exec('echo committed');
  exec('git flow hotfix publish');
  exec('echo published the branch 🎉');
  if (isGhAvailable) {
    exec(
      `gh pr create --title "Hotfix ${version}" --body "Hotfix ${version}" --base main`
    );
  }
  shell.exec('echo created the PR 🎉');
}
