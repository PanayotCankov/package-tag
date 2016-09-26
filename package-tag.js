#! /usr/bin/env node

var path = require("path");
var fs = require("fs");
var semver = require("semver");
var yargs = require("yargs")
    .usage('Usage: $0 --tag alpha')
    .demand('tag')
    .alias('t', 'tag')
    .argv;

var tag = yargs.tag;
var packageJsons = yargs._;
if (!packageJsons || packageJsons.length === 0) {
    packageJsons = ["./package.json"];
}

packageJsons.forEach(p => {
    var absolutePath = path.resolve(p);
    if (fs.statSync(absolutePath).isDirectory()) {
        absolutePath = path.join(absolutePath, "package.json");
    }

    var packageJson = JSON.parse(fs.readFileSync(absolutePath));

    var originalVersion = packageJson.version;
    if (!semver.valid(originalVersion)) {
        console.error("Original package.json version is not semver valid: " + taggedVersion + " for package at: " + absolutePath);
        process.exit(2);
    }

    var originalNonTagVersion = (packageJson.version || "").split("-")[0];

    var taggedVersion = originalNonTagVersion + "-" + tag;
    if (!semver.valid(taggedVersion)) {
        console.error("Tagged package.json version is not semver valid: " + taggedVersion + " for package at: " + absolutePath);
        process.exit(2);
    }

    packageJson.version = taggedVersion;

    fs.writeFileSync(absolutePath, JSON.stringify(packageJson, null, "    "));
    console.log(packageJson.name + "@" + originalVersion + " -> " + packageJson.name + "@" + taggedVersion + " at " + path.relative(process.cwd(), absolutePath));
});


