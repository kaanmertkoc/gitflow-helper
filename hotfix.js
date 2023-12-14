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
    exec(`${command} | lolcat`, (err, stdout, stderr) => {
      if (err) {
        console.error(`exec error: ${err}`);
        return;
      }
      console.log(stdout);
    });
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
    execWithLolcat(
      `gh pr create --title "Hotfix ${version}" --body "Hotfix ${version}" --base main`
    );
  }
  shell.exec('echo created the PR 🎉');
}
