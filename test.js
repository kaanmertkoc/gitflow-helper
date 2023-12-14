#! /usr/bin/env node
var shell = require('shelljs');


// Capture the version argument
var version = process.argv[2];

if (!version) {
    console.error('You must provide a version number. Usage: hotfix <version>');
    process.exit(1);
    }

    // write a test for hotfix
    
